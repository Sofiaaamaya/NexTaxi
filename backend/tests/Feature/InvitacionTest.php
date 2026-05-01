<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Usuario;
use App\Models\Invitacion;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use App\Mail\InvitacionUsuarioMail;

class InvitacionTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_send_invitation()
    {
        Mail::fake();

        $admin = Usuario::create([
            'nombre' => 'Admin Test',
            'email' => 'admin@test.com',
            'password' => bcrypt('password'),
            'rol' => 'admin'
        ]);

        $response = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/admin/invitar', [
                'email' => 'newuser@example.com',
                'rol' => 'conductor'
            ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('invitaciones', [
            'email' => 'newuser@example.com',
            'rol' => 'conductor',
            'usado' => false
        ]);

        Mail::assertSent(InvitacionUsuarioMail::class);
    }

    public function test_user_can_validate_invitation()
    {
        $invitacion = Invitacion::create([
            'email' => 'test@example.com',
            'token' => 'test-token',
            'rol' => 'gerente',
            'expiracion' => now()->addDays(1),
            'usado' => false
        ]);

        $response = $this->postJson('/api/invitaciones/validar', [
            'token' => 'test-token'
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'email' => 'test@example.com',
                'rol' => 'gerente'
            ]);
    }

    public function test_user_can_complete_registration_with_invitation()
    {
        $invitacion = Invitacion::create([
            'email' => 'invited@example.com',
            'token' => 'valid-token',
            'rol' => 'conductor',
            'expiracion' => now()->addDays(1),
            'usado' => false
        ]);

        $response = $this->postJson('/api/invitaciones/completar', [
            'token' => 'valid-token',
            'nombre' => 'Juan Invitado',
            'password' => 'password123',
            'password_confirmation' => 'password123'
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['token', 'user']);

        $this->assertDatabaseHas('usuarios', [
            'email' => 'invited@example.com',
            'rol' => 'conductor'
        ]);

        $this->assertTrue(Invitacion::where('token', 'valid-token')->first()->usado);
    }
}
