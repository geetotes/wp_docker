<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// Get the time from the block's attributes object
$time = $attributes['time']; ?>
?>
<p <?php echo get_block_wrapper_attributes(); ?>>
	<?php esc_html_e( 'My Plugin – hello from a dynamic block!', 'my-plugin' ); ?>
	<?php //esc_html_e( 'The value of the "time" attribute is: '.$time, 'my-plugin' ); ?>
</p>
