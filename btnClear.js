/**
 * @author Guilherme Ferro
 * @data 19/05/2017
 * @version 1.1
 * @atualização 19/03/19
 * @dependencias
 * 	plugin tooltip
 * 	adapter showAfterTimedTooltip
 * 	css hover.css
 * 	css fontawesome.com/v4.7.0/icons/
 * @releases
 * 	1.1 adicionado parametrização e opção para ser usado em input-group-adon mudando a classe
 *
 * @param params.placement default top | params.group default false (para colocar dentro de um input-group-adon)
 *
 *  Plugin para colocar btn de limpar nos inputs text com tooltip e efeito de pulsar com hrv-pop
 *
 */

jQuery.fn.btnClear = function( params )
{
	var param  = $.extend ( { placement : 'top' , group : false } , params );

	// v1.1
	let cssBtnClear = param.group ? 'btn-clear-group' : 'btn-clear';

	$( this ).wrap( '<div class="clear-container"></div>' );
	$( this ).parent( 'div.clear-container' ).append( '<span class="form-control-clear fa fa-close text-danger hrv hvr-pop '+ cssBtnClear + ' pull-right" title="Limpar"></span>' );
	//$( '<span class="form-control-clear fa fa-close text-danger hrv hvr-pop btn-clear pull-right" title="Limpar busca"></span>' ).insertBefore( this );

	$( '.fa.fa-close.btn-clear' ).showAfterTimedTooltip( { placement : param.placement } );

	$( this ).on( 'focus input propertychange' , function()
	{
		var $this   = $( this );
		var visible = Boolean( $this.val() );
		$this.siblings( '.form-control-clear' ).toggleClass( 'hidden' , !visible );
	} ).on( 'blur' , function()
	{
		$( this ).siblings( '.form-control-clear' ).addClass( 'hidden' );
	} ).trigger( 'propertychange' );

	$( '.form-control-clear' ).on( 'mousedown' , function()
	{
		return false;
	} ).click( function()
	{
		$( this ).siblings( 'input[type="text"]' ).val( '' )
			.trigger( 'propertychange' ).focus();
		$( this ).siblings( 'input[type="text"]' ).change();
	} );

	//$( '.fa.fa-close.btn-clear' ).showAfterTimedTooltip( { placement : 'right' } );
};
