import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosAddComponent } from './pedidos-add.component';

describe('PedidosAddComponent', () => {
  let component: PedidosAddComponent;
  let fixture: ComponentFixture<PedidosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
