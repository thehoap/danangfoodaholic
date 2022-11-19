import FormGroup from 'components/FormGroup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ITextEditor {
    formik: any;
    name: string;
    label: string;
    placeholder: string;
}

const TextEditor = ({ formik, name, label, placeholder }: ITextEditor) => {
    return (
        <FormGroup label={label}>
            <ReactQuill
                placeholder={placeholder}
                modules={TextEditor.modules}
                formats={TextEditor.formats}
                value={formik.values[name]}
                onChange={(e) => formik.setFieldValue(name, e)}
            />
        </FormGroup>
    );
};

TextEditor.modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean'],
    ],
};

TextEditor.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
];
export default TextEditor;
