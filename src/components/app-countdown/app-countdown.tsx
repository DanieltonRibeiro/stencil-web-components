import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'app-countdown',
  styleUrl: 'app-countdown.css',
  shadow: true,
})
export class AppCountdown  {

  @Prop() time: string;
  @State() remainingTime: string = '';
  private timer: any;

  componentWillLoad() {
    this.calculateRemainingTime();
  }

  componentDidLoad() {
    this.startTimer();
  }

  componentWillUnload() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  
  private calculateRemainingTime() {
    const targetDate = new Date(this.time);
    const currentDate = new Date();
    const difference = targetDate.getTime() - currentDate.getTime();

    if (difference <= 0) {
      this.remainingTime = '00:00:00:00';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    this.remainingTime = `${this.formatTime(days)}:${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
  }

  
  private formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  
  private startTimer() {
    this.timer = setInterval(() => {
      this.calculateRemainingTime();
    }, 1000);
  }

  render() {
    const [days, hours, minutes, seconds] = this.remainingTime.split(':');

    return (
      <div>
    
        <span>{days}</span><span>D </span>
         : <span>{hours}</span><span>H </span>
         : <span>{minutes}</span><span>M </span>
         : <span>{seconds}</span><span>S</span>

      
      </div>
    );
  }
}
