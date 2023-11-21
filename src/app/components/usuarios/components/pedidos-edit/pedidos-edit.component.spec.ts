import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosEditComponent } from './pedidos-edit.component';

describe('PedidosAddComponent', () => {
  let component: PedidosEditComponent;
  let fixture: ComponentFixture<PedidosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
