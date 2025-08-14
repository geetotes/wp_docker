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

/** WordPress API Fetch library */
import apiFetch from '@wordpress/api-fetch';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( {attributes, setAttributes} ) {
	const [ message, setMessage ] = useState( null );
	const [ title, setTitle ] = useState( null );

	useEffect( () => {
		axios.get( 'http://localhost:8081' )
			.then( ( response ) => {
				if ( response.data.message ) {
					setMessage( response.data.message );
					setAttributes( { time: response.data.time } );
				}
			} )
			.catch( ( error ) => console.error( 'Error fetching API:', error ) );
	}, [] );

	useEffect(() => {
		apiFetch({ path: '/wp/v2/settings' }).then((settings) => {
			return settings
		}).then( ({title}) => {
			setTitle(title);
		});
	},[]);

	return (
		<p { ...useBlockProps() }>
			{ __( 'My Plugin – hello from the editor!', 'my-plugin' ) }
			{ message || __( 'Loading message...', 'my-plugin' )  }
			{ title || __( 'Loading title...', 'my-plugin' ) }
		</p>
	);
}
