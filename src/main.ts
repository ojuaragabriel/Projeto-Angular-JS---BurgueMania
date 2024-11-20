import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHotToastConfig } from '@ngxpert/hot-toast';

bootstrapApplication(AppComponent, {
  // Define a configuração global do HotToast para toda a aplicação
  providers: [provideHotToastConfig(), ...appConfig.providers],
})
  .then(() => {
    console.log('Aplicação inicializada com sucesso!');
  })
  .catch((err) => console.error(err));
