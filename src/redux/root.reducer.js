/* eslint-disable */
import {clone, storage} from "@core/utils";
import {defaultStyles, defaultTitle} from "@/constants";

const TABLE_RESIZE = "TABLE_RESIZE";
const CHANGE_TEXT = "CHANGE_TEXT";
const CHANGE_STYLES = "CHANGE_STYLES";
const APPLY_STYLE = "APPLY_STYLE";
const CHANGE_TITLE = "CHANGE_TITLE";
const UPDATE_DATE = "UPDATE_DATE";

const state = {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: "",
    currentStyles: defaultStyles,
    title: defaultTitle,
    openedData: new Date().toJSON()
};

const normalize = (state) => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ""
});

export const normalizeInitialState = (states) => {
    return states ? normalize(states) : clone(state);
};

function value(state, field, action) {
    const val = state[field] || {};
    val[action.data.id] = action.data.value;
    return val;
}


export const rootReducer = (state = state, action) => {
    let field;
    let val;
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === "col" ? "colState" : "rowState";
            return {
                ...state,
                [field]: value(state, field, action)
            };
        case CHANGE_TEXT:
            field = "dataState";
            return {
                ...state,
                currentText: action.data.value, [field]: value(state, field, action)
            };
        case CHANGE_STYLES:
            return {
                ...state,
                currentStyles: action.data
            };
        case APPLY_STYLE:
            field = "stylesState";
            val = state[field] || {};
            action.data.ids.forEach(id => {
                val[id] = {...val[id], ...action.data.value};
            });
            return {
                ...state,
                [field]: val,
                currentStyles: {...state.currentStyles, ...action.data.value}
            };
        case CHANGE_TITLE:
            return {
                ...state,
                title: action.data,
            };
        case UPDATE_DATE:
            return {
                ...state,
                openedData: new Date().toJSON()
            };
        default:
            return state;
    }
};

export const tableResize = (data) => ({type: TABLE_RESIZE, data});
export const changeText = (data) => ({type: CHANGE_TEXT, data});
export const changeStyles = (data) => ({type: CHANGE_STYLES, data});
export const applyStyle = (data) => ({type: APPLY_STYLE, data});
export const changeTitle = (data) => ({type: CHANGE_TITLE, data});
export const updateDate = () => ({type: UPDATE_DATE});
