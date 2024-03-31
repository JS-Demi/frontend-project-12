import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as filter from 'leo-profanity'
import React, { useEffect, useRef } from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { usePopUpSchema } from '../../hooks/usePopUpSchema'
import { useGetChannelsQuery, useRenameChannelMutation } from '../../store/services/channelsApi'
import './modals.scss'

const PopUpRenameChannel = ({ modalInfo, handleClose }) => {
	// creating ref for input and set focus and select on it
	const inputRef = useRef()
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
			inputRef.current.select()
		}
	}, [inputRef])

	// use hooks for i18n, rename channel, schema and data for initial state form
	const { data: channels } = useGetChannelsQuery()
	const { t } = useTranslation()
	const [renameChannel] = useRenameChannelMutation()
	const schema = usePopUpSchema()

	// get id of the channel to change and channel for initial state
	const { id } = modalInfo
	const channel = channels.find((c) => c.id === id)
	// create handle submit for rename channel
	const handleSubmit = ({ name }) => {
		// filter bad words
		const filtered = { name: filter.clean(name, '*', 0) }
		console.log(filtered)
		const data = { body: filtered, id }
		renameChannel(data)
			.unwrap()
			.then((res) => {
				toast.success(t('toastify.successRename'))
				handleClose()
			})
			.catch((error) => {
				if (error.status === 'FETCH_ERROR') {
					toast.error(t('toastify.fetchError'))
				}
				handleClose()
				console.log(error)
			})
	}

	return (
		<Modal show={true} onHide={handleClose} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>{t('popUp.rename')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={{
						name: channel.name,
					}}
					onSubmit={handleSubmit}
					validationSchema={schema}
				>
					{({ errors, isSubmitting }) => {
						return (
							<Form>
								<div>
									<label id='name' className='visually-hidden' htmlFor='name'>
										{t('popUp.label')}
									</label>
									<Field className={`form-control ${!errors.name ? '' : 'is-invalid'}`} type='text' name='name' innerRef={inputRef} />
									<ErrorMessage component='div' className='invalid-feedback' name='name' />
								</div>
								<div className='d-flex justify-content-end'>
									<button type='button' className='btn btn-secondary' onClick={handleClose}>
										{t('popUp.cancel')}
									</button>
									<button type='submit' className='btn btn-primary' disabled={isSubmitting}>
										{t('popUp.rename')}
									</button>
								</div>
							</Form>
						)
					}}
				</Formik>
			</Modal.Body>
		</Modal>
	)
}

export default PopUpRenameChannel