<!DOCTYPE html>
<html class="dark" lang="en">
    <head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>TaxiAccess - Accessible Login Portal</title>
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;900&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
        <script id="tailwind-config">
            tailwind.config = {
                darkMode: "class",
                theme: {
                    extend: {
                        colors: {
                            "primary": "#136dec",
                            "background-light": "#f8f6f6",
                            "background-dark": "#0f172a",
                        },
                        fontFamily: {
                            "display": ["Public Sans", "sans-serif"]
                        },
                        borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
                    },
                },
            }
        </script>
        <style>
            body { 
                font-family: 'Public Sans', sans-serif; 
            }
            .focus-ring:focus-visible {
                outline: 3px solid #136dec;
                outline-offset: 2px;
            }
        </style>
    </head>

    <body class="bg-background-light text-slate-900 dark:text-slate-100 min-h-screen flex flex-col dark:bg-[#0f172a]">
        <!-- Top Navigation Bar -->
        <header class="w-full border-b border-primary/20 bg-background-light sticky top-0 z-50 dark:bg-[#0f172a]/95">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="bg-primary text-white p-2 rounded-lg flex items-center justify-center">
                        <span aria-hidden="true" class="material-symbols-outlined text-3xl">local_taxi</span>
                    </div>
                    <h1 class="text-2xl font-bold tracking-tight text-primary">TaxiAccess</h1>
                </div>
                <nav aria-label="Support Navigation">
                    <button class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 font-bold transition-colors focus-ring min-h-[44px]">
                        <span aria-hidden="true" class="material-symbols-outlined text-xl">help_outline</span>
                        <span>Help Center</span>
                    </button>
                </nav>
            </div>
        </header>

        <main class="flex-grow flex items-center justify-center p-4 sm:p-8">
            <div class="w-full max-w-4xl space-y-12">
                <!-- STEP 1: Role Selection -->
                <section aria-labelledby="role-heading" id="role-selection">
                    <div class="text-center mb-10">
                        <h2 class="text-3xl sm:text-4xl font-black mb-4" id="role-heading">Select your role</h2>
                        <p class="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">Choose your account type to access the management dashboard.</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <!-- Admin Role -->
                        <button class="group flex flex-col items-center p-8 rounded-xl bg-white dark:bg-primary/5 border-2 border-slate-200 dark:border-primary/20 hover:border-primary focus-ring transition-all">
                            <div class="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span aria-hidden="true" class="material-symbols-outlined text-4xl">admin_panel_settings</span>
                            </div>
                            <span class="text-xl font-bold mb-2">Gerente</span>
                            <span class="text-sm text-slate-500 dark:text-slate-400 text-center">Gestión de flota y despacho</span>
                        </button>
                        <!-- Driver Role -->
                        <button class="group flex flex-col items-center p-8 rounded-xl bg-white dark:bg-primary/5 border-2 border-primary focus-ring transition-all ring-2 ring-primary">
                            <div class="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center mb-4 transition-colors">
                                <span aria-hidden="true" class="material-symbols-outlined text-4xl">directions_car</span>
                            </div>
                            <span class="text-xl font-bold mb-2">Conductor</span>
                            <span class="text-sm text-slate-500 dark:text-slate-400 text-center">Control de rutas y horarios</span>
                        </button>
                        <!-- Passenger Role -->
                        <button class="group flex flex-col items-center p-8 rounded-xl bg-white dark:bg-primary/5 border-2 border-slate-200 dark:border-primary/20 hover:border-primary focus-ring transition-all">
                            <div class="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span aria-hidden="true" class="material-symbols-outlined text-4xl">visibility</span>
                            </div>
                            <span class="text-xl font-bold mb-2">Supervisor</span>
                            <span class="text-sm text-slate-500 dark:text-slate-400 text-center">Monitoreo y soporte operativo</span>
                        </button>
                    </div>
                </section>
                
                <hr aria-hidden="true" class="border-primary/20" />
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <!-- STEP 2: Login Form -->
                    <section aria-labelledby="login-heading" class="bg-white dark:bg-primary/5 p-8 rounded-xl border border-slate-200 dark:border-primary/20 shadow-xl" id="login-form">
                        <h2 class="text-2xl font-bold mb-6" id="login-heading">Conductor Login</h2>
                        
                        <form class="space-y-6" method="POST" action="{{ route('login') }}" novalidate>
                            @csrf
                            <div>
                                <label class="block text-lg font-semibold mb-2" for="email">Email Address or ID</label>
                                <div class="relative">
                                    <span aria-hidden="true" class="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">mail</span>
                                    <input aria-required="true"
                                        class="w-full pl-12 pr-4 h-14 bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-primary/30 rounded-xl focus:border-primary focus:ring-0 text-lg focus-ring transition-colors"
                                        id="email" name="email" value="{{ old('email') }}" placeholder="name@taxiaccess.com" required type="email" autofocus autocomplete="username" />
                                </div>
                                <x-input-error :messages="$errors->get('email')" class="mt-2 text-red-500 text-sm font-medium" />
                            </div>
                            
                            <div>
                                <div class="flex justify-between items-center mb-2">
                                    <label class="text-lg font-semibold" for="password">Password</label>
                                    @if (Route::has('password.request'))
                                        <a class="text-primary hover:underline font-bold focus-ring rounded p-1" href="{{ route('password.request') }}">Forgot Password?</a>
                                    @endif
                                </div>
                                <div class="relative">
                                    <span aria-hidden="true" class="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">lock</span>
                                    <input aria-required="true"
                                        class="w-full pl-12 pr-4 h-14 bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-primary/30 rounded-xl focus:border-primary focus:ring-0 text-lg focus-ring transition-colors"
                                        id="password" name="password" placeholder="••••••••" required type="password" autocomplete="current-password" />
                                    <button aria-label="Show password" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary min-w-[44px] min-h-[44px] flex items-center justify-center focus-ring rounded-lg cursor-pointer" type="button" onclick="const p = document.getElementById('password'); p.type = p.type === 'password' ? 'text' : 'password';">
                                        <span aria-hidden="true" class="material-symbols-outlined">visibility</span>
                                    </button>
                                </div>
                                <x-input-error :messages="$errors->get('password')" class="mt-2 text-red-500 text-sm font-medium" />
                            </div>
                            
                            <div class="flex items-center gap-3">
                                <input class="w-6 h-6 rounded border-2 border-primary text-primary focus:ring-primary focus-ring" id="remember" name="remember" type="checkbox" />
                                <label class="text-base font-medium" for="remember">Remember this device</label>
                            </div>
                            
                            <button class="w-full h-14 bg-primary text-white font-black text-xl rounded-xl hover:bg-primary/90 focus-ring shadow-lg shadow-primary/20 transition-transform active:scale-[0.98]" type="submit">
                                Sign In
                            </button>
                        </form>
                        
                        <!-- Error State Representation -->
                        @if ($errors->any())
                            <div class="mt-6 p-4 bg-red-500/10 border-l-4 border-red-500 text-red-700 dark:text-red-400 flex gap-3 items-center rounded-r-lg" role="alert">
                                <span aria-hidden="true" class="material-symbols-outlined">error</span>
                                <div>
                                    <p class="font-medium">Please check the details carefully.</p>
                                    <ul class="list-disc list-inside text-sm mt-1">
                                        @foreach ($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                            </div>
                        @endif
                    </section>
                    
                    <!-- STEP 3: Password Recovery / Feedback -->
                    <section aria-labelledby="recovery-heading" class="space-y-6" id="recovery">
                        <div class="bg-white dark:bg-primary/5 p-8 rounded-xl border border-slate-200 dark:border-primary/20">
                            <h2 class="text-2xl font-bold mb-4" id="recovery-heading">Password Recovery</h2>
                            <p class="text-slate-600 dark:text-slate-400 mb-6">Enter your email and we'll send you a link to reset your secure credentials.</p>
                            
                            <form class="space-y-4" method="POST" action="{{ route('password.email') }}">
                                @csrf
                                <div>
                                    <label class="block text-lg font-semibold mb-2" for="recovery-email">Recovery Email</label>
                                    <input class="w-full pl-12 pr-4 h-14 bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-primary/30 rounded-xl focus:border-primary focus:ring-0 text-lg focus-ring transition-colors" id="recovery-email" name="email" placeholder="your@email.com" type="email" required />
                                    <x-input-error :messages="$errors->get('email')" class="mt-2 text-red-500 text-sm font-medium" />
                                </div>
                                <button class="w-full h-14 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold text-lg rounded-xl focus-ring transition-all" type="submit">
                                    Send Recovery Link
                                </button>
                            </form>
                            
                            <!-- Success Feedback Representation -->
                            @if (session('status'))
                                <div aria-live="polite" class="mt-8 p-6 bg-green-500/10 border-2 border-green-500/50 rounded-xl text-center" role="status">
                                    <div class="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span aria-hidden="true" class="material-symbols-outlined text-2xl">check</span>
                                    </div>
                                    <h3 class="font-bold text-green-700 dark:text-green-400 mb-1">Recovery Link Sent!</h3>
                                    <p class="text-sm text-green-600 dark:text-green-500">{{ session('status') }}</p>
                                </div>
                            @endif
                            
                            <!-- Error Feedback Representation -->
                            @if ($errors->has('email') && !session('status'))
                                <div aria-live="polite" class="mt-8 p-6 bg-red-500/10 border-2 border-red-500/50 rounded-xl text-center" role="status">
                                    <div class="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span aria-hidden="true" class="material-symbols-outlined text-2xl">error</span>
                                    </div>
                                    <h3 class="font-bold text-red-700 dark:text-red-400 mb-1">Recovery Failed!</h3>
                                    <p class="text-sm text-red-600 dark:text-red-500">Please check the email entered.</p>
                                </div>
                            @endif
                        </div>
                        
                        <div class="p-8 rounded-xl bg-primary/10 border-2 border-dashed border-primary/30 text-center">
                            <span aria-hidden="true" class="material-symbols-outlined text-4xl text-primary mb-2">contact_support</span>
                            <h3 class="font-bold text-lg mb-1">Locked out?</h3>
                            <p class="text-sm mb-4">If you no longer have access to your email, please contact the dispatch office.</p>
                            <a class="inline-flex items-center gap-2 font-black text-primary hover:underline focus-ring rounded px-2 py-1" href="tel:+34900000000">
                                <span aria-hidden="true" class="material-symbols-outlined text-sm">call</span>
                                Call Dispatch: +34 900 000 000
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </main>
        
        <footer class="w-full py-8 px-4 border-t border-primary/10 bg-white mt-12 dark:bg-[#0f172a]/80">
            <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div class="flex items-center gap-4 text-slate-500">
                    <p>© 2024 TaxiAccess Lanzarote. All rights reserved.</p>
                </div>
                <div class="flex flex-wrap justify-center gap-6">
                    <a class="font-semibold hover:text-primary focus-ring rounded px-2" href="#">Privacy Policy</a>
                    <a class="font-semibold hover:text-primary focus-ring rounded px-2" href="#">Terms of Service</a>
                    <a class="font-semibold hover:text-primary focus-ring rounded px-2" href="#">Accessibility Statement</a>
                </div>
                <div class="flex items-center gap-2 text-primary font-bold">
                    <span aria-hidden="true" class="material-symbols-outlined text-xl">universal_currency</span>
                    <span>WCAG 2.1 AA Compliant</span>
                </div>
            </div>
        </footer>
    </body>