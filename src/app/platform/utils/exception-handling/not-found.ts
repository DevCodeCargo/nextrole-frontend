import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nr-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex flex-col bg-background text-text-primary selection:bg-primary-fixed selection:text-on-primary-fixed">
      
      <nav class="bg-background/90 backdrop-blur-md sticky top-0 z-50 border-b border-border-default h-20 shadow-xs">
        <div class="flex items-center w-full px-section-padding-mobile md:px-section-padding-desktop max-w-max-width mx-auto h-full">
          <a class="font-headline-md text-headline-md font-bold tracking-tight text-primary hover:opacity-90 transition-standard" href="/">
            NextRole
          </a>
        </div>
      </nav>

      <main class="flex-grow flex items-center justify-center px-section-padding-mobile py-section-padding-mobile">
        <div class="max-w-xl w-full">
          
          <div class="bg-surface-container-lowest border border-border-default rounded-[16px] p-8 md:p-12 large-card-shadow text-center flex flex-col items-center card-interaction">
            
            <div class="w-16 h-16 bg-blue-light rounded-full flex items-center justify-center mb-6">
              <i class="ph ph-magnifying-glass-minus text-primary text-[32px]"></i>
            </div>
            
            <div class="font-headline-xl text-headline-xl text-text-primary mb-2 opacity-10 font-extrabold tracking-tighter select-none">
              404
            </div>
            
            <h1 class="font-headline-md text-headline-md text-text-primary mb-4">Page Not Found</h1>
            
            <p class="font-body-sm text-body-sm text-text-secondary mb-10 max-w-sm mx-auto leading-relaxed">
              The page you are looking for does not exist or may have been moved. Please check the URL or use the buttons below to return to safety.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-3 w-full justify-center">
              <button class="bg-primary text-on-primary px-6 py-3 rounded-lg font-semibold font-body-sm text-body-sm flex items-center justify-center gap-2 hover:bg-blue-hover transition-standard active:scale-95 cursor-pointer shadow-sm"
                      (click)="goToDashboard()">
                Go to Dashboard
                <i class="ph ph-arrow-right text-[16px]"></i>
              </button>
              
              <button class="bg-surface-container text-text-primary border border-border-default px-6 py-3 rounded-lg font-semibold font-body-sm text-body-sm hover:bg-surface-variant transition-standard active:scale-95 cursor-pointer"
                      (click)="goBack()">
                Go Back
              </button>
            </div>
            
            <button class="mt-6 text-text-muted hover:text-primary font-medium font-body-sm text-body-sm transition-standard flex items-center gap-1.5 cursor-pointer"
                    (click)="refreshPage()">
              <i class="ph ph-arrows-clockwise text-[16px]"></i>
              Refresh Page
            </button>
          </div>

          <div class="mt-12 opacity-30 flex justify-center select-none">
            <div class="grid grid-cols-6 gap-2">
              <div class="w-1 h-1 rounded-full bg-border-strong"></div>
              <div class="w-1 h-1 rounded-full bg-border-strong"></div>
              <div class="w-1 h-1 rounded-full bg-border-strong"></div>
              <div class="w-1 h-1 rounded-full bg-border-strong"></div>
              <div class="w-1 h-1 rounded-full bg-border-strong"></div>
              <div class="w-1 h-1 rounded-full bg-border-strong"></div>
            </div>
          </div>

        </div>
      </main>
    </div>
  `,
  styles: [`
    .large-card-shadow {
      box-shadow: 0 8px 24px rgba(47, 42, 36, 0.06);
    }
    
    .transition-standard {
      transition: all 200ms ease-out;
    }

    .card-interaction {
      transition: transform 250ms ease-out, box-shadow 250ms ease-out;
    }

    .card-interaction:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 36px rgba(47, 42, 36, 0.1);
    }
  `]
})
export class NotFound {

  goToDashboard(): void {
    window.location.href = '/';
  }

  goBack(): void {
    window.history.back();
  }

  refreshPage(): void {
    window.location.reload();
  }
}