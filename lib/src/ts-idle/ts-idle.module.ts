import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { TsIdleComponent } from './idle/ts-idle.component';
import { IdleService } from './services/idle.service';

@NgModule({
    declarations: [TsIdleComponent],
    imports: [
        CommonModule,
        MatDialogModule
    ],
    exports: [TsIdleComponent]
})
export class TsIdleModule {
    public static forRoot(config: any): ModuleWithProviders<TsIdleModule> {
        return {
            ngModule: TsIdleModule,
            providers: [
                IdleService,
                { provide: 'config', useValue: config}
            ]
        };
    }
}
