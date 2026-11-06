import { Component, input, signal, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-code-snippet',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="code-snippet">
      <div class="code-snippet__header">
        <span class="code-snippet__lang">{{ title() || language() }}</span>
        <button
          type="button"
          class="code-snippet__copy-btn"
          (click)="copyCode()"
        >
          @if (copied()) {
            <svg class="code-snippet__icon text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            <span>¡Copiado!</span>
          } @else {
            <svg class="code-snippet__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            <span>Copiar</span>
          }
        </button>
      </div>
      <pre class="code-snippet__pre"><code>{{ code() }}</code></pre>
    </div>
  `,
  styles: [`
    .code-snippet {
      position: relative;
      background-color: #0f1117;
      border: 1px solid #1e2230;
      border-radius: 1rem;
      overflow: hidden;
      margin: 1rem 0;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }

    .code-snippet__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.625rem 1rem;
      background-color: #171b26;
      border-bottom: 1px solid #1e2230;
    }

    .code-snippet__lang {
      font-size: 0.75rem;
      font-weight: 600;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .code-snippet__copy-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.25rem 0.625rem;
      background: transparent;
      border: 1px solid #2d3348;
      border-radius: 0.5rem;
      color: #94a3b8;
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .code-snippet__copy-btn:hover {
      background-color: #242a3d;
      color: #ffffff;
      border-color: #3b425e;
    }

    .code-snippet__icon {
      width: 0.875rem;
      height: 0.875rem;
    }

    .text-emerald-400 {
      color: #34d399;
    }

    .code-snippet__pre {
      margin: 0;
      padding: 1.25rem;
      overflow-x: auto;
      color: #e2e8f0;
      font-size: 0.84rem;
      line-height: 1.6;
    }

    .code-snippet__pre code {
      font-family: inherit;
      white-space: pre;
    }
  `],
})
export class CodeSnippetComponent {
  readonly code = input.required<string>();
  readonly language = input<string>('html');
  readonly title = input<string>('');

  protected readonly copied = signal(false);

  copyCode() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.code()).then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      });
    }
  }
}
