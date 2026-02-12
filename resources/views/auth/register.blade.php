<!DOCTYPE html>

<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>NexTaxi Registration and Login</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap"
        rel="stylesheet" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
    <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
        rel="stylesheet" />
    <script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#0b2eda",
                        "primary-dark": "#061a8e",
                        "background-light": "#f5f6f8",
                        "background-dark": "#101322",
                        "volcanic": "#2D2D2D",
                        "sand": "#e0d2b4",
                    },
                    fontFamily: {
                        "display": ["Plus Jakarta Sans", "sans-serif"]
                    },
                    borderRadius: {  "DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "2xl": "2rem", "full": "9999px " },
                    boxShadow: {
                        'soft': '0 20px 40px -10px rgba(11, 46, 218, 0.1)',
                        'inner-light': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
                    }
                },
            },
        }
    </script>
    <style>
        /* Custom scrollbar for a cleaner look */
        ::-webkit-scrollbar {
            width: 8px;
        }

        ::-webkit-scrollbar-track {
            background: transparent;
        }

        ::-webkit-scrollbar-thumb {
            background-color: rgba(11, 46, 218, 0.2);
            border-radius: 20px;
        }

        /* Smooth transitions for role switching */
        .role-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .input-group:focus-within label {
            color: #0b2eda;
        }

        /* Organic shape background */
        .organic-bg {
            background-image: radial-gradient(circle at 10% 20%, rgba(224, 210, 180, 0.4) 0%, transparent 40%),
                radial-gradient(circle at 90% 80%, rgba(11, 46, 218, 0.1) 0%, transparent 40%);
        }
    </style>
</head>

<body
    class="font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100 min-h-screen flex flex-col organic-bg overflow-x-hidden">
    <!-- Sticky Header -->
    <header
        class="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-background-dark/80 border-b border-gray-200 dark:border-gray-800 h-16 sm:h-20">
        <div class="max-w-7xl mx-auto px-4 h-full flex items-center justify-between relative">
            <button aria-label="Go back"
                class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
                <span class="material-icons-round text-2xl">arrow_back</span>
            </button>
            <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <h1 class="text-2xl font-bold tracking-tight text-primary">NexTaxi</h1>
            </div>
            <!-- Placeholder for balance -->
            <div class="w-10"></div>
        </div>
    </header>
    <!-- Main Content -->
    <main class="flex-grow flex items-center justify-center py-12 px-4 sm:px-6">
        <div class="w-full max-w-md space-y-8">
            <!-- Hero Text -->
            <div class="text-center space-y-2">
                <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Bienvenido
                    a Lanzarote</h2>
                <p class="text-gray-500 dark:text-gray-400">Selecciona tu perfil para comenzar el viaje.</p>
            </div>
            <!-- Role Selection Cards -->
            <div class="grid grid-cols-2 gap-4 sm:gap-6">
                <!-- User Role Card -->
                <div id="role-cliente" onclick="selectRole('cliente')"
                    class="role-card group relative flex flex-col items-center p-6 rounded-2xl bg-white dark:bg-gray-800 border-2 border-primary shadow-soft cursor-pointer hover:shadow-lg hover:-translate-y-1">
                    <div class="absolute top-3 right-3" id="check-cliente">
                        <span class="material-icons-round text-primary text-xl">check_circle</span>
                    </div>
                    <div
                        class="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <span class="material-icons-round text-primary text-3xl">person</span>
                    </div>
                    <span class="text-lg font-bold text-gray-900 dark:text-white">USUARIO</span>
                    <span class="text-xs text-primary mt-1 font-medium">Pasajero</span>
                </div>

                <!-- Driver Role Card -->
                <div id="role-conductor" onclick="selectRole('conductor')"
                    class="role-card group relative flex flex-col items-center p-6 rounded-2xl bg-white dark:bg-gray-800 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all opacity-70 hover:opacity-100">
                    <div class="absolute top-3 right-3 hidden" id="check-conductor">
                        <span class="material-icons-round text-primary text-xl">check_circle</span>
                    </div>
                    <div
                        class="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4 group-hover:bg-sand/20 transition-colors">
                        <span
                            class="material-icons-round text-gray-500 dark:text-gray-400 group-hover:text-sand text-3xl">directions_car</span>
                    </div>
                    <span
                        class="text-lg font-bold text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white">CONDUCTOR</span>
                    <span class="text-xs text-gray-400 mt-1 font-medium">Socio</span>
                </div>
            </div>

            <!-- Form Container -->
            <div
                class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-primary/5 p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                <!-- Decorative Top Bar -->
                <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-blue-400"></div>

                <form method="POST" action="{{ route('register') }}" class="space-y-6 mt-2">
                    @csrf
                    <input type="hidden" name="rol" id="rol" value="cliente">

                    <!-- Name Field -->
                    <div class="input-group">
                        <label
                            class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 transition-colors"
                            for="name">Nombre completo</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span class="material-icons-round text-gray-400 text-xl">badge</span>
                            </div>
                            <input
                                class="block w-full pl-10 pr-3 py-3 border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow duration-200 @error('name') border-red-500 @enderror"
                                id="name" name="name" placeholder="Ej. César Manrique" type="text"
                                value="{{ old('name') }}" required autofocus autocomplete="name" />
                        </div>
                        @error('name')
                        <p class="mt-1 text-sm text-red-500">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Email Field -->
                    <div class="input-group">
                        <label
                            class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 transition-colors"
                            for="email">Correo electrónico</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span class="material-icons-round text-gray-400 text-xl">mail</span>
                            </div>
                            <input
                                class="block w-full pl-10 pr-3 py-3 border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow duration-200 @error('email') border-red-500 @enderror"
                                id="email" name="email" placeholder="usuario@nextaxi.com" type="email"
                                value="{{ old('email') }}" required autocomplete="username" />
                        </div>
                        @error('email')
                        <p class="mt-1 text-sm text-red-500">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Phone Field -->
                    <div class="input-group">
                        <label
                            class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 transition-colors"
                            for="phone">Teléfono móvil</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span class="material-icons-round text-gray-400 text-xl">smartphone</span>
                            </div>
                            <input
                                class="block w-full pl-10 pr-3 py-3 border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow duration-200 @error('phone') border-red-500 @enderror"
                                id="phone" name="phone" placeholder="+34 600 000 000" type="tel"
                                value="{{ old('phone') }}" />
                        </div>
                        @error('phone')
                        <p class="mt-1 text-sm text-red-500">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Password Field -->
                    <div class="input-group">
                        <label
                            class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 transition-colors"
                            for="password">Contraseña</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span class="material-icons-round text-gray-400 text-xl">lock</span>
                            </div>
                            <input
                                class="block w-full pl-10 pr-10 py-3 border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow duration-200 @error('password') border-red-500 @enderror"
                                id="password" name="password" placeholder="••••••••" type="password" required
                                autocomplete="new-password" />
                            <div class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onclick="togglePasswordVisibility('password')">
                                <span
                                    class="material-icons-round text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl">visibility</span>
                            </div>
                        </div>
                        @error('password')
                        <p class="mt-1 text-sm text-red-500">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- Confirm Password Field -->
                    <div class="input-group">
                        <label
                            class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 transition-colors"
                            for="password_confirmation">Confirmar Contraseña</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span class="material-icons-round text-gray-400 text-xl">lock_reset</span>
                            </div>
                            <input
                                class="block w-full pl-10 pr-10 py-3 border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow duration-200"
                                id="password_confirmation" name="password_confirmation" placeholder="••••••••"
                                type="password" required autocomplete="new-password" />
                            <div class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onclick="togglePasswordVisibility('password_confirmation')">
                                <span
                                    class="material-icons-round text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl">visibility</span>
                            </div>
                        </div>
                    </div>

                    <!-- Terms Checkbox -->
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input
                                class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
                                id="terms" name="terms" type="checkbox" required />
                        </div>
                        <div class="ml-3 text-sm">
                            <label class="font-medium text-gray-600 dark:text-gray-400" for="terms">Acepto los <a
                                    class="text-primary hover:text-primary-dark underline" href="#">Términos y
                                    Condiciones</a></label>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div>
                        <button
                            class="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-full shadow-lg shadow-primary/30 text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all transform hover:-translate-y-0.5"
                            type="submit">
                            Comenzar viaje
                            <span class="material-icons-round ml-2 text-base">arrow_forward</span>
                        </button>
                    </div>
                </form>

                <script>
                    function selec                        {
                                              hidden input
                        document                        yId('rol').value = role;

                                    // Reset classes for both cards
                                    const roles                            conductor'];
                        roles.forEach(                                               const card = document.getElementBy
                                        const                                 ElementById(`che                                                    if (r === role) {
                                                      state
                                card.classList                                sparent', 'opacity-70');
                                            ca                                rder-primary', 'sh                                                         check.classList.remove('hidden'                                           } else {
                                // I                                                          card.                            or                        ent'                    ty-                                                  card.classList.                        er-primary', 'shadow-soft');
                                            check.classList.add('hidden');
                                        }
                                    });
                                }

                                           gg                    rdbility(fieldId) {
                 const field = document.getElementById(fieldId);
                        if (field.type === "password") {
                            field.type = "text";
                        } else {
                            field.type = "password";
                        }
                    }
                </script>
                <!-- Toggle Login/Register -->
                <div class="mt-6 text-center">
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        ¿Ya tienes cuenta?
                        <a class="font-bold text-primary hover:text-primary-dark transition-colors" href="#">Iniciar
                            Sesión</a>
                    </p>
                </div>
            </div>
            <!-- Admin Footer Link -->
            <div class="flex justify-center pt-4">
                <a class="group flex items-center space-x-2 text-xs font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full backdrop-blur-sm"
                    href="#">
                    <span
                        class="material-icons-round text-base opacity-70 group-hover:opacity-100">admin_panel_settings</span>
                    <span>Acceso para Administrador o Supervisor</span>
                </a>
            </div>
        </div>
    </main>
    <!-- Decorative organic background element (bottom left) -->
    <div class="fixed bottom-0 left-0 -z-10 w-96 h-96 opacity-20 pointer-events-none">
        <svg viewbox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.2,-19.2,95.8,-5.2C93.5,8.9,82,22.1,70.8,33.4C59.6,44.7,48.7,54.1,36.5,61.9C24.3,69.7,10.8,75.9,-1.9,79.2C-14.6,82.5,-27.9,82.9,-40.3,77.8C-52.7,72.7,-64.2,62.1,-73.4,49.6C-82.6,37.1,-89.5,22.7,-88.9,8.5C-88.3,-5.7,-80.2,-19.7,-70.5,-31.6C-60.8,-43.5,-49.5,-53.3,-37.2,-61.6C-24.9,-69.9,-11.6,-76.7,2.9,-81.7C17.4,-86.7,30.5,-73.6,44.7,-76.4Z"
                fill="#0b2eda" transform="translate(100 100)"></path>
        </svg>
    </div>
</body>

</html>