import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ITextEditor {
    formik: any;
    name: string;
    placeholder: string;
}

const TextEditor = ({ formik, name, placeholder }: ITextEditor) => {
    return (
        <ReactQuill
            placeholder={placeholder}
            modules={TextEditor.modules}
            formats={TextEditor.formats}
        />
    );
};

TextEditor.modules = {
    toolbar: [
        [{ header: [1, 2, 3] }],
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
