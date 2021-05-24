import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeleccionAlimentosPage } from './seleccion-alimentos.page';

describe('SeleccionAlimentosPage', () => {
  let component: SeleccionAlimentosPage;
  let fixture: ComponentFixture<SeleccionAlimentosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionAlimentosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeleccionAlimentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
