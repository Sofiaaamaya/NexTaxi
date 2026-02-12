<!DOCTYPE html>
<html class="dark" lang="en">
    <head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>NexTaxi - Accessible Login Portal</title>
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
                    <h1 class="text-2xl font-bold tracking-tight text-primary">NexTaxi</h1>
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
                            <span class="text-xl font-bold mb-2">Usuario</span>
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



                <!-- End Navigation Bar -->



        <footer class="w-full py-8 px-4 border-t border-primary/10 bg-white mt-12 dark:bg-[#0f172a]/80">
            <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div class="flex items-center gap-4 text-slate-500">
                    <p>© 2026 NexTaxi Lanzarote. All rights reserved.</p>
                </div>
                <div class="flex flex-wrap justify-center gap-6">
                    <a class="font-semibold hover:text-primary focus-ring rounded px-2" href="#">Privacy Policy</a>
                    <a class="font-semibold hover:text-primary focus-ring rounded px-2" href="#">Terms of Service</a>
                    <a class="font-semibold hover:text-primary focus-ring rounded px-2" href="#">Accessibility Statement</a>
                </div>
            </div>
        </footer>
    </body>