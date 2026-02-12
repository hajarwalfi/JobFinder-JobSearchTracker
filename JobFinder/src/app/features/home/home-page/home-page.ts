import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroSection } from '../hero-section/hero-section';
import { FeaturesSection } from '../features-section/features-section';

@Component({
  selector: 'app-home-page',
  imports: [HeroSection, FeaturesSection, RouterLink],
  templateUrl: './home-page.html',
})
export class HomePage {}
