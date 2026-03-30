
"use client";
import React, { useState, useEffect } from "react";
import { type FormikValues, useFormikContext } from "formik";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";

interface TextboxProps {
    name: string;
    placeholder?: string;
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string | null;
    visible: boolean;
    disabled?: boolean;
    value: string | number;
    label?: string;
    isMandatory?: boolean;
    isOptional?: boolean;
}

const Textbox: React.FC<TextboxProps> = ({
    name,
    placeholder,
    error,
    visible,
    value,
    handleChange,
    disabled = false,
    label,
    isMandatory = false,
    isOptional = false,
    ...otherProps
}) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: placeholder || 'Start typing...',
            }),
        ],
        content: value as string || '',
        editable: !disabled,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            // Create a synthetic event for Formik
            const syntheticEvent = {
                target: {
                    name: name,
                    value: html
                }
            } as React.ChangeEvent<HTMLTextAreaElement>;
            handleChange(syntheticEvent);
        },
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
    });

    // Update editor content when value changes externally
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value as string || '');
        }
    }, [editor, value]);

    if (!editor) {
        return null;
    }

    return (
        <div className="form-textbox relative">
            <Label className="text-white text-sm font-medium mb-2">
                {label}
                {isMandatory && (
                    <span className="text-primary">*</span>
                )}
                {isOptional && (
                    <span className="text-primary rounded-full px-2 bg-[#FFFFFF05] text-xs inline py-1">Optional</span>
                )}
            </Label>
            <div className={
                    cn(
                        "min-h-[109px] border border-primary/10 resize-none",
                        "text-white  focus:outline-none focus-visible:ring-primary",
                        "focus-visible:ring-[1px] transition-all rounded-md",
                        isFocused ? "border-primary" : "border-primary/10"
                    )
                }
            >
                {/* Editor content at the top */}
                <div className={`${disabled ? "cursor-not-allowed" : ""} rounded-t-xl`}>
                    <EditorContent
                        editor={editor}
                        className="prose prose-sm max-w-none p-4 min-h-[109px] focus:outline-none text-white"
                        {...otherProps}
                    />
                </div>
                {/* Separator line */}
                <div className="border-t border-primary/10"></div>
                {/* Rich text toolbar at the bottom */}
                <div className="flex items-center justify-between p-3 rounded-b-xl">
                    {/* Text styling group */}
                    <div className="flex items-center space-x-1">
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`p-2 hover:bg-gray-100 rounded transition-colors ${
                                editor.isActive('bold') ? 'bg-gray-200' : ''
                            }`}
                            title="Bold (Ctrl+B)"
                        >
                            <span className="text-sm font-bold text-blue-600">B</span>
                        </button>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={`p-2 hover:bg-gray-100 rounded transition-colors ${
                                editor.isActive('italic') ? 'bg-gray-200' : ''
                            }`}
                            title="Italic (Ctrl+I)"
                        >
                            <span className="text-sm italic text-gray-500">I</span>
                        </button>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={`p-2 hover:bg-gray-100 rounded transition-colors ${
                                editor.isActive('strike') ? 'bg-gray-200' : ''
                            }`}
                            title="Strikethrough"
                        >
                            <span className="text-sm line-through text-gray-500">S</span>
                        </button>
                    </div>
                    {/* Separator */}
                    <div className="w-px h-6 bg-gray-300"></div>
                    {/* Alignment group */}
                    <div className="flex items-center space-x-1">
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            className={`p-2 hover:bg-gray-100 rounded transition-colors ${
                                editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
                            }`}
                            title="Align Left"
                        >
                            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            className={`p-2 hover:bg-gray-100 rounded transition-colors ${
                                editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
                            }`}
                            title="Align Center"
                        >
                            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6 8a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6 16a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"/>
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                            className={`p-2 hover:bg-gray-100 rounded transition-colors ${
                                editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''
                            }`}
                            title="Align Right"
                        >
                            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 8a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 16a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"/>
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                            className={`p-2 hover:bg-gray-100 rounded transition-colors ${
                                editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200' : ''
                            }`}
                            title="Justify"
                        >
                            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                            </svg>
                        </button>
                    </div>
                    {/* Separator */}
                    <div className="w-px h-6 bg-gray-300"></div>
                    {/* Paragraph/Block formatting group */}
                    <div className="flex items-center">
                        <select
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === 'p') {
                                    editor.chain().focus().setParagraph().run();
                                } else if (value === 'h1') {
                                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                                } else if (value === 'h2') {
                                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                                } else if (value === 'h3') {
                                    editor.chain().focus().toggleHeading({ level: 3 }).run();
                                }
                            }}
                            className="text-sm text-gray-700 bg-transparent border-none outline-none cursor-pointer"
                            defaultValue="p"
                        >
                            <option value="p">Paragraph</option>
                            <option value="h1">Heading 1</option>
                            <option value="h2">Heading 2</option>
                            <option value="h3">Heading 3</option>
                        </select>
                    </div>
                    {/* Empty space for additional controls */}
                    <div className="flex-1"></div>
                </div>
            </div>
            {/* Error message */}
            {error && visible && (
                <p className="text-xs text-error error mt-1"> {error} </p>
            )}
            {/* Custom styles for Tiptap */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    .ProseMirror {
                        outline: none !important;
                        min-height: 120px !important;
                        color: #FFFFFF !important;
                        font-size: 14px !important;
                        font-weight: 500 !important;
                        line-height: 1.5 !important;
                    }
                    .ProseMirror p.is-editor-empty:first-child::before {
                        content: attr(data-placeholder);
                        float: left;
                        color: white;
                        pointer-events: none;
                        height: 0;
                    }
                    .ProseMirror h1 {
                        font-size: 1.5rem !important;
                        font-weight: bold !important;
                        margin: 0.5rem 0 !important;
                    }
                    .ProseMirror h2 {
                        font-size: 1.25rem !important;
                        font-weight: bold !important;
                        margin: 0.5rem 0 !important;
                    }
                    .ProseMirror h3 {
                        font-size: 1.125rem !important;
                        font-weight: bold !important;
                        margin: 0.5rem 0 !important;
                    }
                    .ProseMirror code {
                        background-color: #F3F4F6 !important;
                        padding: 0.125rem 0.25rem !important;
                        border-radius: 0.25rem !important;
                        font-size: 0.875rem !important;
                    }
                `
            }} />
        </div>
    );
};

// TextboxField component that integrates with Formik

interface TextboxFieldProps {
    name: string;
    label: string;
    disabled?: boolean;
    isOptional?: boolean;
    isMandatory?: boolean;
    placeholder?: string;
    isStringArr?: boolean;
    parentName?: string;
    index?: number;
    customHandleChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextboxField: React.FC<TextboxFieldProps> = ({
    name,
    parentName,
    isStringArr,
    index,
    label,
    placeholder,
    customHandleChange,
    disabled = false,
    isMandatory = false,
    isOptional = false,
    ...otherProps
}) => {
    const { errors, touched, handleChange, values } = useFormikContext<FormikValues>();
    return (
        <div className="form-field mb-5">
            <Textbox
                name={name}
                placeholder={placeholder || ""}
                error={errors?.[name] as string | undefined}
                visible={!!touched?.[name]}
                handleChange={customHandleChange ? customHandleChange : handleChange}
                disabled={disabled}
                value={(isStringArr && parentName) ? values[parentName][index || 0] : values[name] || ""}
                label={label}
                isMandatory={isMandatory}
                isOptional={isOptional}
                {...otherProps}
            />
        </div>
    );
};

export default Textbox;
export { TextboxField };