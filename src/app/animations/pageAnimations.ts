import { Animation, createAnimation } from '@ionic/angular';

export const pageAnimations = (baseEl: HTMLElement, opts?: any): Animation => {
  const DURATION = 300;

  const enteringPage = createAnimation()
    .addElement(opts.enteringEl)
    .duration(DURATION)
    .easing('cubic-bezier(0.3,0,0.66,1)')
    .fromTo('transform', 'translateX(100%)', 'translateX(0)')
    .fromTo('opacity', '0.25', '1');

  const leavingPage = createAnimation()
    .addElement(opts.leavingEl)
    .duration(DURATION)
    .easing('cubic-bezier(0.3,0,0.66,1)')
    .fromTo('transform', 'translateX(0)', 'translateX(-100%)')
    .fromTo('opacity', '1', '0.25');

  return createAnimation().addAnimation([enteringPage, leavingPage]);
};
