import { Component, Input, OnInit } from '@angular/core';
import { random } from '../utils';

@Component({
  selector: 'app-anime-preview',
  templateUrl: './anime-preview.component.html',
  styleUrls: ['./anime-preview.component.scss']
})
export class AnimePreviewComponent {
  @Input() name: string;
  @Input() thumbnailUrl: string;
  @Input() badges: string[];
  public missingThumbnailPlaceholders = [
    'shrug1.jpg',
    'shrug2.png',
    'shrug3.png',
    'shrug4.png',
    // 'shrug5.jpg',
    'shrugsparent.png',
    'shrug6.png',
  ].map(file => `assets/shrugs/${file}`);
  public placeholder = random(this.missingThumbnailPlaceholders);
}
