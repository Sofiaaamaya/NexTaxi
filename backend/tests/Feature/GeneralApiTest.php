<?php

namespace Tests\Feature;

use App\Models\Usuario;
use App\Models\Conductor;
use App\Models\Vehiculo;
use App\Models\SolicitudTaxi;
use App\Models\Viaje;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GeneralApiTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;
    protected $conductorUser;
    protected $conductor;
    protected $vehiculo;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = Usuario::create([
            'nombre' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password123'),
            'rol' => 'administrador'
        ]);

        $this->vehiculo = Vehiculo::create([
            'matricula' => 'ABC-1234',
            'marca' => 'Toyota',
            'modelo' => 'Corolla'
        ]);

        $this->conductorUser = Usuario::create([
            'nombre' => 'Driver User',
            'email' => 'driver@example.com',
            'password' => bcrypt('password123'),
            'rol' => 'conductor'
        ]);

        $this->conductor = Conductor::create([
            'id_usuario' => $this->conductorUser->id_usuario,
            'dni' => '12345678X',
            'numero_licencia' => 'LIC-123',
            'id_vehiculo' => $this->vehiculo->id_vehiculo,
            'estado' => 'disponible',
            'estado_verificacion' => 'aprobado'
        ]);
    }

    //  Vehículos 
    public function test_can_list_vehicles()
    {
        $response = $this->actingAs($this->admin, 'sanctum')
            ->getJson('/api/vehiculos');

        $response->assertStatus(200);
    }

    public function test_can_create_vehicle()
    {
        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson('/api/vehiculos', [
                'matricula' => 'XYZ-9876',
                'marca' => 'Honda',
                'modelo' => 'Civic'
            ]);

        $response->assertStatus(201);
    }

    //  Conductores 
    public function test_can_list_conductores()
    {
        $response = $this->actingAs($this->admin, 'sanctum')
            ->getJson('/api/conductores');

        $response->assertStatus(200);
    }

    public function test_can_create_conductor()
    {
        $response = $this->actingAs($this->admin, 'sanctum')
            ->postJson('/api/conductores', [
                'nombre' => 'New Driver',
                'email' => 'newdriver@example.com',
                'password' => 'password123',
                'dni' => '98765432Y',
                'numero_licencia' => 'LIC-999',
                'id_vehiculo' => $this->vehiculo->id_vehiculo
            ]);

        $response->assertStatus(201);
    }

    public function test_conductor_can_get_profile()
    {
        $response = $this->actingAs($this->conductorUser, 'sanctum')
            ->getJson('/api/conductores/perfil');

        $response->assertStatus(200)
            ->assertJsonPath('dni', '12345678X');
    }

    //  Solicitudes 
    public function test_can_store_solicitud_as_guest()
    {
        $response = $this->postJson('/api/solicitudes', [
            'recogida_lat' => -34.6037,
            'recogida_lng' => -58.3816,
            'recogida_direccion' => 'Calle Principal 123',
            'destino_lat' => -34.6038,
            'destino_lng' => -58.3817,
            'destino_direccion' => 'Centro Comercial',
            'nombre_cliente' => 'Guest User',
            'telefono_cliente' => '5551234'
        ]);

        $response->assertStatus(201);
    }

    public function test_admin_can_list_solicitudes()
    {
        $response = $this->actingAs($this->admin, 'sanctum')
            ->getJson('/api/solicitudes');

        $response->assertStatus(200);
    }

    //  Viajes 
    public function test_can_list_viajes()
    {
        $response = $this->actingAs($this->admin, 'sanctum')
            ->getJson('/api/viajes');

        $response->assertStatus(200);
    }
}
