import produce from 'immer'

import {
	SET_SIZES_TYPE,
	SET_SIZES_VALUE,
	SET_SIZES_FETCHING,
	SET_SIZES_ERROR,
	RESET_SIZES
} from '../actions'

import {
	SIZES_TYPE_BROWSER_WIDTH
} from '../../../constants/sizes'

export const initialState = () => ({
	type: SIZES_TYPE_BROWSER_WIDTH,
	value: {}
})

export const initialSubState = () => ({
	value: [],
	fetching: false,
	error: undefined
})

export default produce((draft, action) => {

	const hasDomainId = () => action.domainId != null
	const hasDomainValue = () => draft.value[action.domainId] != null

	if (hasDomainId() === true && hasDomainValue() === false) draft.value[action.domainId] = initialSubState()

	switch (action.type) {
		case SET_SIZES_TYPE:
			// Reset value because a different type results in a different value strcuture
			// and because the view shouldn't show the old data when switching.
			draft.value = initialState().value
			draft.type = action.payload || initialState().type
			break
		case SET_SIZES_VALUE:
			draft.value[action.domainId].value = action.payload || initialSubState().value
			break
		case SET_SIZES_FETCHING:
			draft.value[action.domainId].fetching = action.payload || initialSubState().fetching
			break
		case SET_SIZES_ERROR:
			draft.value[action.domainId].error = action.payload || initialSubState().error
			break
		case RESET_SIZES:
			return initialState()
	}

}, initialState())