/* 
 * All rights reserved : Matteo Collina
 * Linkedin: https://it.linkedin.com/in/matteo-collina-98ab73ab
 */

$(document).ready(function () {
    
    
    (function ($) {
                
        var defaults = {
          activeStep : 1,
          showBtn : true
        };    

        var methods = {
            init: function (options) {
                console.log('Init hillWizard');
                var wizard = $(this);
                var settings = $.extend({}, defaults, options);
                var activeStep = settings.activeStep;
                var showBtn = settings.showBtn;
                
                methods.setActiveStep(wizard,activeStep);
                
                /* init onclick event */
                var aSteps = wizard.children('.steps').children('a');
                aSteps.each(function( index ) {
                    if (!$(this).hasClass('back') && !$(this).hasClass('forward')){
                        var cStep = $(this).attr('href').replace('#step', '');
                        $(this).unbind("click").bind("click",{wizard: wizard,currentStep: cStep},methods.setActiveStepOnClick);
                    }else if($(this).hasClass('back')){
                        $(this).unbind("click").bind("click",{wizard: wizard,direction: "back"},methods.setActiveStepBtn);
                    }else{
                        $(this).unbind("click").bind("click",{wizard: wizard,direction: "forward"},methods.setActiveStepBtn);
                    }
                });
                
                
                /* Check showGoBack*/
                if(!showBtn){
                    wizard.find('.back').hide();
                    wizard.find('.forward').hide();
                }
                
                /* Enable / Disable Btn on init */
                methods.checkStateBtns(wizard,activeStep);
            },
            setActiveStepOnClick : function(e) {
                var wizard = e.data.wizard;
                var currentStep = e.data.currentStep;
                methods.setActiveStep(wizard,currentStep);
            },
            setActiveStepBtn : function(e) {
                var wizard = e.data.wizard;
                var direction = e.data.direction;
                
                var cStep = methods.getCurrentStep(wizard);                
                var nextCStep = direction == "back" ? parseInt(cStep)-1 : parseInt(cStep)+1;
                methods.setActiveStep(wizard,nextCStep);
            },
            setActiveStep : function(wizard,currentStep) {

                var contents = wizard.children('.contents').children() ;
                contents.each(function( index ) {
                    if($(this).data('step') == currentStep){
                        $(this).addClass('active');
                    }else{
                        $(this).removeClass('active');
                    }
                 });
                 
                 /* Setto a Active */
                 var aSteps = wizard.children('.steps').children('a');
                 aSteps.each(function( index ) {
                     var cStep = $(this).attr('href').replace('#step', '');
                     if(cStep == currentStep){
                            $(this).addClass('active');
                        }else{
                            $(this).removeClass('active');
                     }
                 });
                 
                 methods.checkStateBtns(wizard,currentStep);
            },
            checkStateBtns : function(wizard,currentStep) {
                if(currentStep == 1){
                    wizard.find('.back').addClass('disabled').removeClass('enabled');
                    wizard.find('.forward').addClass('enabled').removeClass('disabled');
                }else if(currentStep == methods.getSteps(wizard).length){
                    wizard.find('.back').addClass('enabled').removeClass('disabled');
                    wizard.find('.forward').addClass('disabled').removeClass('enabled');
                }else{
                    wizard.find('.back').addClass('enabled').removeClass('disabled');
                    wizard.find('.forward').addClass('enabled').removeClass('disabled');
                }
            },
            getSteps : function(wizard) {
                var allASteps =  wizard.children('.steps').children('a');
                var steps = [];
                allASteps.each(function( index ) {
                    if (!$(this).hasClass('back') && !$(this).hasClass('forward')){
                        steps.push($(this));
                    }
                });
                return steps;
            },
            getCurrentStep : function(wizard) {
                var allASteps = methods.getSteps(wizard);  
                var cStep = 0;
                jQuery.each( allASteps, function( i, val ) {
                    if (val.hasClass('active')){
                        cStep =  val.attr('href').replace('#step', '');
                    }
                });
                return cStep;
            }
        };
        
        
        $.fn.hillWizard = function (methodOrOptions) {
            if (methods[methodOrOptions]) {
                return methods[ methodOrOptions ].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
                // Default to "init"
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + methodOrOptions + ' does not exist on jQuery.hillWizard');
            }
        };

    })(jQuery);
    
    
    
    /* example */
    $('.hillWizard').hillWizard({  
        activeStep : 2,
        showBtn : true /* show back and forward buttons*/
    });
});