<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Editar Usuario') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">

                    <form method="POST" action="{{ route('usuarios.update', $usuario) }}" class="space-y-6">
                        @csrf
                        @method('PUT')

                        <!-- Nombre -->
                        <div>
                            <label for="nombre"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre
                                Completo</label>
                            <input type="text" name="nombre" id="nombre" value="{{ old('nombre', $usuario->nombre) }}"
                                required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white sm:text-sm">
                            <x-input-error :messages="$errors->get('nombre')" class="mt-2" />
                        </div>

                        <!-- Email -->
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Correo
                                Electrónico</label>
                            <input type="email" name="email" id="email" value="{{ old('email', $usuario->email) }}"
                                required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white sm:text-sm">
                            <x-input-error :messages="$errors->get('email')" class="mt-2" />
                        </div>

                        <!-- Contraseña -->
                        <div>
                            <label for="contraseña"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña (Dejar en
                                blanco para no cambiar)</label>
                            <input type="password" name="contraseña" id="contraseña"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white sm:text-sm">
                            <x-input-error :messages="$errors->get('contraseña')" class="mt-2" />
                        </div>

                        <!-- Teléfono -->
                        <div>
                            <label for="telefono"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">Teléfono</label>
                            <input type="text" name="telefono" id="telefono"
                                value="{{ old('telefono', $usuario->telefono) }}"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white sm:text-sm">
                            <x-input-error :messages="$errors->get('telefono')" class="mt-2" />
                        </div>

                        <!-- Rol -->
                        <div>
                            <label for="rol"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">Rol</label>
                            <select name="rol" id="rol" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white sm:text-sm">
                                <option value="cliente" {{ old('rol', $usuario->rol) == 'cliente' ? 'selected' : ''
                                    }}>Cliente</option>
                                <option value="conductor" {{ old('rol', $usuario->rol) == 'conductor' ? 'selected' : ''
                                    }}>Conductor</option>
                                <option value="supervisor" {{ old('rol', $usuario->rol) == 'supervisor' ? 'selected' :
                                    '' }}>Supervisor</option>
                                <option value="administrador" {{ old('rol', $usuario->rol) == 'administrador' ?
                                    'selected' : '' }}>Administrador</option>
                            </select>
                            <x-input-error :messages="$errors->get('rol')" class="mt-2" />
                        </div>

                        <!-- Idioma -->
                        <div>
                            <label for="idioma"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">Idioma</label>
                            <select name="idioma" id="idioma" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white sm:text-sm">
                                <option value="es" {{ old('idioma', $usuario->idioma) == 'es' ? 'selected' : ''
                                    }}>Español</option>
                                <option value="en" {{ old('idioma', $usuario->idioma) == 'en' ? 'selected' : ''
                                    }}>Inglés</option>
                                <option value="de" {{ old('idioma', $usuario->idioma) == 'de' ? 'selected' : ''
                                    }}>Alemán</option>
                            </select>
                            <x-input-error :messages="$errors->get('idioma')" class="mt-2" />
                        </div>

                        <!-- Activo -->
                        <div class="flex items-center">
                            <input type="checkbox" name="activo" id="activo" value="1" {{ old('activo',
                                $usuario->activo) ? 'checked' : '' }}
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500
                            dark:border-gray-700 dark:bg-gray-900">
                            <label for="activo" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">Usuario
                                Activo</label>
                        </div>

                        <div class="flex items-center justify-end">
                            <a href="{{ route('usuarios.index') }}"
                                class="text-gray-600 hover:text-gray-900 px-4">Cancelar</a>
                            <button type="submit"
                                class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Actualizar Usuario
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>