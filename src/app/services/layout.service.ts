import { Injectable, RendererFactory2 } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public renderer;
  constructor(rendererFactory: RendererFactory2, private storage: Storage) { 
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  addBodyClass(bodyClass) {
    this.renderer.addClass(document.body, bodyClass);
  }

  removeBodyClass(bodyClass) {
    this.renderer.removeClass(document.body, bodyClass);
  }
  addTheme(theme , removeTheme1,removeTheme2)
  {
    this.renderer.removeClass(document.body, removeTheme2);
    this.renderer.removeClass(document.body, removeTheme1);
    this.renderer.addClass(document.body, theme);
    this.storage.set("theme", theme)
 
  }

  intializeTheme(){
   this.storage.get("theme").then(themes => {
    this.renderer.addClass(document.body, themes);
   })
  }
}
