<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Gestión de Conductores') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

            <div class="mb-4 flex justify-end">
                <a href="{{ route('conductores.create') }}"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Registrar Conductor
                </a>
            </div>

            @if(session('success'))
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                role="alert">
                <strong class="font-bold">Éxito!</strong>
                <span class="block sm:inline">{{ session('success') }}</span>
            </div>
            @endif

            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <div class="overflow-x-auto">
                        <table class="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        Nombre / Licencia
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        Vehículo Asignado
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        Estado
                                    </th>
                                    <th
                                        class="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($conductores as $conductor)
                                <tr>
                                    <td
                                        class="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                                        <div class="flex items-center">
                                            <div class="ml-3">
                                                <p
                                                    class="text-gray-900 dark:text-gray-200 whitespace-no-wrap font-bold">
                                                    {{ $conductor->usuario->nombre }}
                                                </p>
                                                <p class="text-gray-600 dark:text-gray-400 whitespace-no-wrap text-xs">
                                                    Lic: {{ $conductor->numero_licencia }}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td
                                        class="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
                                        <p class="text-gray-900 dark:text-gray-200 whitespace-no-wrap">
                                            {{ $conductor->vehiculo->marca }} {{ $conductor->vehiculo->modelo }}
                                            <span class="text-gray-500 text-xs">({{ $conductor->vehiculo->matricula
                                                }})</span>
                                        </p>
                                    </td>
                                    <td
                                        class="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-center">
                                        @php
                                        $estadoColors = [
                                        'disponible' => 'green',
                                        'ocupado' => 'yellow',
                                        'fuera_servicio' => 'red',
                                        ];
                                        $color = $estadoColors[$conductor->estado] ?? 'gray';
                                        @endphp
                                        <span
                                            class="relative inline-block px-3 py-1 font-semibold text-{{ $color }}-900 leading-tight">
                                            <span aria-hidden
                                                class="absolute inset-0 bg-{{ $color }}-200 opacity-50 rounded-full"></span>
                                            <span class="relative uppercase text-xs">{{ str_replace('_', ' ',
                                                $conductor->estado) }}</span>
                                        </span>
                                    </td>
                                    <td
                                        class="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-center">
                                        <div class="flex justify-center gap-2">
                                            <a href="{{ route('conductores.edit', $conductor) }}"
                                                class="text-indigo-600 hover:text-indigo-900 p-2">
                                                Editar
                                            </a>
                                            <form action="{{ route('conductores.destroy', $conductor) }}" method="POST"
                                                onsubmit="return confirm('¿Estás seguro de que deseas eliminar este conductor?');">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="text-red-600 hover:text-red-900 p-2">
                                                    Eliminar
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                        <div
                            class="px-5 py-5 bg-white dark:bg-gray-800 border-t flex flex-col xs:flex-row items-center xs:justify-between">
                            {{ $conductores->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>