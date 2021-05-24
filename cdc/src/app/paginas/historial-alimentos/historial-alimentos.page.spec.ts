import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistorialAlimentosPage } from './historial-alimentos.page';

describe('HistorialAlimentosPage', () => {
  let component: HistorialAlimentosPage;
  let fixture: ComponentFixture<HistorialAlimentosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialAlimentosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialAlimentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
