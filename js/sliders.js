'use strict';

class Slider{

    constructor (selector,params) {

        this.params = params;
        this.selector = selector;
        this.wrap_width = $(selector).width();
        this.wrap_height = $(selector).height();
        this.slides = $(selector).children();
        this.active = (this.params.active != undefined) ? this.params.active : 0;
        this.auto = '';
    }

    slide_display(){
        return (this.params.wrapDirection == 'top' || this.params.wrapDirection == 'bottom') ? 'block' : 'inline-block';
    }
    slide_width(){

        let slideWidth;

        if(this.params.slideWidth == undefined){
            slideWidth = (this.params.wrapDirection == 'top' || this.params.wrapDirection == 'bottom') ? this.wrap_width : this.slides.width();
        }
        else {
            slideWidth = this.params.slideWidth;
        }
        return slideWidth;
    }
    slide_height() {

        let slideHeight;

        if (this.params.slideHeight == undefined) {
            slideHeight = (this.params.wrapDirection == 'top' || this.params.wrapDirection == 'bottom') ? this.slides.height() : this.wrap_height;
        }
        else {
            slideHeight = this.params.slideHeight;
        }
        return slideHeight;

    }

    slide_step(){
        return (this.params.wrapDirection == 'top' || this.params.wrapDirection == 'bottom') ? this.slide_height() : this.slide_width();
    }

    slider_wrap(){

        let all_slides = [];
        let main_slides = $(this.selector).children();
        let last_slide = this.slides[main_slides.length-1];
        let first_slide = this.slides[0];

        // all_slides[0] = last_slide;
        // for(let i=1;i<=main_slides.length;i++){
        //
        //     all_slides[i] = main_slides.eq(i-1).clone()[0];
        //
        // }
        // all_slides[main_slides.length + 1] = first_slide;

        return main_slides;
    }

    on_screen_slides(){
        return (this.params.onScreenSlides != undefined) ? this.params.onScreenSlides : this.wrap_width/this.slide_width();
    }

    time_out(){
        return (this.params.timeout != undefined) ? this.params.timeout : 1500
    }

    actives_slide(){
        let slider = $(this.selector);
        let wrap = slider.children();
        let slideStep = this.slide_step();
        let direction = this.params.wrapDirection;
        $(wrap).removeClass('active');
        $(wrap[this.active]).addClass('active');
        $(wrap).stop().animate({[direction]:'-'+slideStep*this.active+'px'},500);
    }

    auto_slide(){
        let timeout = this.time_out();
        if(timeout === false) return;
        this.auto = setInterval(this.next_slide.bind(this),timeout);
    }
    stop_auto_slide(){
        clearInterval(this.auto);
    }
    start_pos(){
        let slider = $(this.selector);
        let wrap = slider.children();
        let slideStep = this.slide_step();
        let direction = this.params.wrapDirection;
        $(wrap).removeClass('active');
        $(wrap[this.active]).addClass('active');
        $(wrap).css({[direction]:'-'+slideStep*this.active+'px'});
    }
    next_count(){
        let wrap = this.slider_wrap();
        if(this.params.cycleWrap === true){
            if (wrap.length-1 == (this.active+this.on_screen_slides()-1)){
                wrap.clone().appendTo($(this.selector));
                this.active++;
            } else{
                this.active++;
            }
        }
        else{
            return (wrap.length-1 == (this.active+this.on_screen_slides()-1)) ? this.active = 0 : this.active++ ;
        }
    }
    prev_count(){
        let wrap = this.slider_wrap();
        // if(this.params.cycleWrap === true){
        //     if (this.active == 0){
        //         // let wrap = this.slider_wrap();
        //         wrap.clone().prependTo($(this.selector));
        //         this.active = this.slides.length - 1;
        //         console.log(wrap);
        //     } else{
        //         this.active--;
        //     }
        // }
        // else{
        return (this.active == 0) ? this.active = wrap.length-this.on_screen_slides() : this.active--;
        // }
    }

    next_slide(){
        // let clicked = false;
        // if(clicked === true) return;
        // setInterval(function (){clicked = true},1000);
        this.next_count();
        this.active_dot();
        this.actives_slide();
    }

    prev_slide(){
        // let clicked = true;
        // if(clicked == false) return;
        // clicked = false;
        // setInterval(function (){clicked = true},1000);
        this.prev_count();
        this.active_dot();
        this.actives_slide();
    }

    dots_pagination(){
        let dots = this.params.dotsPagitanion;
        if(dots === true){
            $(this.selector).parent().append('<div class="slider-dots"></div>');
            for(let i=0;i<this.slider_wrap().length;i++){
                $('.slider-dots').append('<div class="dot"></div>');
                // $('.slider-dots .dot').attr('data-dot')
            }
            this.active_dot();
        }
    }

    dot_click(active_dot){
        this.active = active_dot;
        this.active_dot();
        this.actives_slide();
    }

    active_dot(){
        let slider_dots = $(this.selector).parent().find('.slider-dots');
        slider_dots.find('.dot').removeClass('active');
        slider_dots.find('.dot:eq('+this.active+')').addClass('active');
    }

    start(){
        // $(this.selector).empty().append(this.slider_wrap());
        this.start_pos();
        this.dots_pagination();
        this.auto_slide();
    }


    // slides_styles(){
    //
    //     this.styles = {
    //         display: this.slide_display(),
    //         width: this.slide_width(),
    //         height: this.slide_height(),
    //         position:this.params.wrapDirection
    //     };
    //
    //     return this.styles;
    // }


    // slider_styles(){
    //
    //     this.styles = {
    //         width: this.slide_width(),
    //         height: this.slide_height()
    //     };
    //
    //     return this.styles;
    // }

}