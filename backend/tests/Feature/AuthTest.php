<?php

namespace Tests\Feature;

use App\Models\Usuario;
use App\Models\Invitacion;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Carbon\Carbon;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register_as_cliente()
    {
        $response = $this->postJson('/api/auth/register', [
            'nombre' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'telefono' => '123456789'
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure(['msg', 'user', 'token']);

        $this->assertDatabaseHas('usuarios', [
            'email' => 'test@example.com',
            'rol' => 'cliente'
        ]);
    }

    public function test_user_can_register_with_invitation()
    {
        $invitacion = Invitacion::create([
            'email' => 'driver@example.com',
            'token' => 'test-token',
            'rol' => 'conductor',
            'expiracion' => Carbon::now()->addDays(1),
            'usado' => false
        ]);

        $response = $this->postJson('/api/auth/register', [
            'nombre' => 'Driver User',
            'email' => 'driver@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'token' => 'test-token'
        ]);

        $response->assertStatus(201);
        
        $this->assertDatabaseHas('usuarios', [
            'email' => 'driver@example.com',
            'rol' => 'conductor'
        ]);

        $this->assertTrue($invitacion->fresh()->usado);
    }

    public function test_user_cannot_login_with_incorrect_credentials()
    {
        Usuario::create([
            'nombre' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
            'rol' => 'cliente'
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'test@example.com',
            'password' => 'wrong-password'
        ]);

        $response->assertStatus(401);
    }

    public function test_user_can_login_with_correct_credentials()
    {
        Usuario::create([
            'nombre' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
            'rol' => 'cliente'
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'test@example.com',
            'password' => 'password123'
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['msg', 'user', 'token']);
    }

    public function test_user_can_get_own_profile()
    {
        $user = Usuario::create([
            'nombre' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
            'rol' => 'cliente'
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/auth/me');

        $response->assertStatus(200)
            ->assertJson(['email' => 'test@example.com']);
    }

    public function test_user_can_logout()
    {
        $user = Usuario::create([
            'nombre' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
            'rol' => 'cliente'
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/auth/logout');

        $response->assertStatus(200);
    }
}
