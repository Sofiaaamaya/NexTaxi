<?php

namespace Tests\Feature;

use App\Models\Usuario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\Mail;
use App\Mail\InvitacionUsuarioMail;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->admin = Usuario::create([
            'nombre' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password123'),
            'rol' => 'administrador'
        ]);
    }

    public function test_admin_can_list_users()
    {
        $response = $this->actingAs($this->admin, 'sanctum')
            ->getJson('/api/admin/usuarios');

        $response->assertStatus(200);
    }

    public function test_admin_can_list_drivers()
    {
        $response = $this->actingAs($this->admin, 'sanctum')
            ->getJson('/api/admin/conductores');

        $response->assertStatus(200);
    }

    public function test_admin_can_invite_user()
    {
        Mail::fake();

        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson('/api/admin/invitar', [
                'email' => 'newdriver@example.com',
                'rol' => 'conductor'
            ]);

        $response->assertStatus(200);
        
        $this->assertDatabaseHas('invitaciones', [
            'email' => 'newdriver@example.com',
            'rol' => 'conductor'
        ]);

        Mail::assertSent(InvitacionUsuarioMail::class);
    }

    public function test_non_admin_cannot_access_admin_endpoints()
    {
        $user = Usuario::create([
            'nombre' => 'Normal User',
            'email' => 'user@example.com',
            'password' => bcrypt('password123'),
            'rol' => 'cliente'
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/admin/usuarios');

        $response->assertStatus(403);
    }
}
