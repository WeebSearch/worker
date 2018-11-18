import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimePreviewComponent } from './anime-preview.component';

describe('AnimePreviewComponent', () => {
  let component: AnimePreviewComponent;
  let fixture: ComponentFixture<AnimePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
