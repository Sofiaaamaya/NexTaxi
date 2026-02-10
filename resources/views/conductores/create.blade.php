<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Registrar Conductor') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">

                    <form method="POST" action="{{ route('conductores.store') }}" class="space-y-6">
                        @csrf

                        <!-- Usuario (Conductor) -->
                        <div>
                            <label for="id_usuario"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">Usuario
                                (Conductor)</label>
                            <select name="id_usuario" id="id_usuario" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white sm:text-sm">
                                <option value="">Seleccione un usuario</option>
                                @foreach($usuarios as $usuario)
                                <option value="{{ $usuario->id_usuario }}" {{ old('id_usuario')==$usuario->id_usuario ?
                                    'selected' : '' }}>
                                    {{ $usuario->nombre }} ({{ $usuario->email }})
                                </option>
                                @endforeach
                            </select>
                            <x-input-error :messages="$errors->get('id_usuario')" class="mt-2" />
                            @if($usuarios->isEmpty())
                            <p class="text-sm text-yellow-600 mt-1">No hay usuarios con rol 'conductor' disponibles.
                                Cree uno primero.</p>
                            @endif
                        </div>

                        <!-- Licencia -->
                        <div>
                            <label for="numero_licencia"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">Número de
                                Licencia</label>
                            <input type="text" name="numero_licencia" id="numero_licencia"
                                value="{{ old('numero_licencia') }}" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white sm:text-sm">
                            <x-input-error :messages="$errors->get('numero_licencia')" class="mt-2" />
                        </div>

                        <!-- Vehiculo -->
                        <div>
                            <label for="id_vehiculo"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">Vehículo
                                Asignado</label>
                            <select name="id_vehiculo" id="id_vehiculo" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white sm:text-sm">
                                <option value="">Seleccione un vehículo</option>
                                @foreach($vehiculos as $vehiculo)
                                <option value="{{ $vehiculo->id_vehiculo }}" {{ old('id_vehiculo')==$vehiculo->
                                    id_vehiculo ? 'selected' : '' }}>
                                    {{ $vehiculo->marca }} {{ $vehiculo->modelo }} ({{ $vehiculo->matricula }})
                                </option>
                                @endforeach
                            </select>
                            <x-input-error :messages="$errors->get('id_vehiculo')" class="mt-2" />
                            @if($vehiculos->isEmpty())
                            <p class="text-sm text-yellow-600 mt-1">No hay vehículos registrados.</p>
                            @endif
                        </div>

                        <!-- Estado -->
                        <div>
                            <label for="estado"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado
                                Inicial</label>
                            <select name="estado" id="estado" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white sm:text-sm">
                                <option value="fuera_servicio" {{ old('estado')=='fuera_servicio' ? 'selected' : '' }}>
                                    Fuera de Servicio</option>
                                <option value="disponible" {{ old('estado')=='disponible' ? 'selected' : '' }}>
                                    Disponible</option>
                                <option value="ocupado" {{ old('estado')=='ocupado' ? 'selected' : '' }}>Ocupado
                                </option>
                            </select>
                            <x-input-error :messages="$errors->get('estado')" class="mt-2" />
                        </div>

                        <div class="flex items-center justify-end">
                            <a href="{{ route('conductores.index') }}"
                                class="text-gray-600 hover:text-gray-900 px-4">Cancelar</a>
                            <button type="submit"
                                class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Guardar Conductor
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>