import { Lock } from "lucide-react";
import { authenticatePrezaToken } from "@/app/ru/preza-token/actions";

export function PrezaTokenGate() {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-muted px-6">
      <div className="mesh-gradient absolute inset-0" />
      <div className="grid-pattern absolute inset-0 opacity-40" />
      <div className="grain-overlay" />

      <div className="glass-panel-strong relative w-full max-w-md rounded-2xl p-8 md:p-10">
        <div className="gold-badge mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl">
          <Lock className="h-5 w-5" aria-hidden />
        </div>

        <h1 className="text-center font-display text-2xl font-medium text-[var(--brand-dark)]">
          Закрытый доступ
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Введите пароль для просмотра презентации.
        </p>

        <form action={authenticatePrezaToken} className="mt-8 space-y-4">
          <div>
            <label htmlFor="preza-password" className="sr-only">
              Пароль
            </label>
            <input
              id="preza-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Пароль"
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-shadow duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <button
            type="submit"
            className="btn-premium w-full cursor-pointer rounded-xl px-4 py-3 text-sm font-medium"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
