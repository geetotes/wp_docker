/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';


/** Axios library for API calls */
import axios from 'axios';

/** Common Rect hooks */
import { useState, useEffect } from 'react';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
	const [ message, setMessage ] = useState( null );

	useEffect( () => {
		axios.get( 'http://localhost:8081' )
			.then( ( response ) => {
				if ( response.data.message ) {
					setMessage( response.data.message );
				}
			} )
			.catch( ( error ) => console.error( 'Error fetching API:', error ) );
	}, [] );

	return (
		<p { ...useBlockProps() }>
			{ __( 'My Plugin – hello from the editor!', 'my-plugin' ) }
			{ message || __( 'Loading message...', 'my-plugin' )  }
		</p>
	);
}
