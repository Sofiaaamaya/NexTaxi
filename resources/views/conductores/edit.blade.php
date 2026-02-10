<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Editar Conductor') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">

                    <form method="POST" action="{{ route('conductores.update', $conductor) }}" class="space-y-6">
                        @csrf
                        @method('PUT')

                        <!-- Usuario (Conductor) -->
                        <div>
                            <label for="id_usuario"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">Usuario
                                (Conductor)</label>
                            <select name="id_usuario" id="id_usuario" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white sm:text-sm">
                                <option value="{{ $conductor->id_usuario }}" selected>
                                    {{ $conductor->usuario->nombre }} ({{ $conductor->usuario->email }})
                                </option>
                                {{-- Typically you wouldn't change the underlying user of a conductor record easily, but
                                allowing re-assignment involves loading other users --}}
                            </select>
                            <p class="text-xs text-gray-500 mt-1">El usuario asociado no se puede cambiar directamente.
                            </p>
                            <x-input-error :messages="$errors->get('id_usuario')" class="mt-2" />
                        </div>

                        <!-- Licencia -->
                        <div>
                            <label for="numero_licencia"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">Número de
                                Licencia</label>
                            <input type="text" name="numero_licencia" id="numero_licencia"
                                value="{{ old('numero_licencia', $conductor->numero_licencia) }}" required
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
                                @foreach($vehiculos as $vehiculo)
                                <option value="{{ $vehiculo->id_vehiculo }}" {{ old('id_vehiculo', $conductor->
                                    id_vehiculo) == $vehiculo->id_vehiculo ? 'selected' : '' }}>
                                    {{ $vehiculo->marca }} {{ $vehiculo->modelo }} ({{ $vehiculo->matricula }})
                                </option>
                                @endforeach
                            </select>
                            <x-input-error :messages="$errors->get('id_vehiculo')" class="mt-2" />
                        </div>

                        <!-- Estado -->
                        <div>
                            <label for="estado"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
                            <select name="estado" id="estado" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white sm:text-sm">
                                <option value="fuera_servicio" {{ old('estado', $conductor->estado) == 'fuera_servicio'
                                    ? 'selected' : '' }}>Fuera de Servicio</option>
                                <option value="disponible" {{ old('estado', $conductor->estado) == 'disponible' ?
                                    'selected' : '' }}>Disponible</option>
                                <option value="ocupado" {{ old('estado', $conductor->estado) == 'ocupado' ? 'selected' :
                                    '' }}>Ocupado</option>
                            </select>
                            <x-input-error :messages="$errors->get('estado')" class="mt-2" />
                        </div>

                        <div class="flex items-center justify-end">
                            <a href="{{ route('conductores.index') }}"
                                class="text-gray-600 hover:text-gray-900 px-4">Cancelar</a>
                            <button type="submit"
                                class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Actualizar Conductor
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>