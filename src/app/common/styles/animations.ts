import { trigger, state, style, transition, animate } from '@angular/animations';

export let fade = trigger('fade', [
    state('void', style({ opacity: 0 })),
    transition(':enter, :leave', [
        animate(1000)
    ])
])

export let toastFade = trigger('toastFade', [
    state('void', style({ opacity: 0, marginTop: '-15px' })),
    transition(':enter, :leave', [
        animate(500)
    ])
])

