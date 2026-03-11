import React, { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { type FormikValues, useFormikContext } from "formik";
import { PiExportLight } from "react-icons/pi";
import { LuTrash2 } from "react-icons/lu";
import { FieldError } from "../ui/field";

interface ImagePickerProps {
    name: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    acceptedTypes?: string[];
    maxSize?: number; // in MB
    placeholder?: string;
    multiple?: boolean; // Allow multiple file selection
    maxFiles?: number; // Maximum number of files when multiple is true
    customHandleChange?: (files: File[] | File | null) => void;
    icon?: boolean;
    showPreview?: boolean;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
    name,
    disabled = false,
    acceptedTypes = ["image/jpeg", "image/png", "application/pdf"],
    placeholder,
    multiple = false,
    maxFiles = 5,
    customHandleChange,
    showPreview = true,
}) => {
    const { errors, touched, setFieldValue, values } = useFormikContext<FormikValues>();

    const hasError = touched[name] && errors[name];


    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Derive selectedFiles from Formik values instead of maintaining separate state
    const selectedFiles = useMemo(() => {
        const formikFiles = values[name];
        if (!formikFiles) return [];
        return Array.isArray(formikFiles) ? formikFiles : [formikFiles];
    }, [values, name]);

    // Clear file input when form is reset
    useEffect(() => {
        const formikFiles = values[name];
        if (!formikFiles || (Array.isArray(formikFiles) && formikFiles.length === 0)) {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values[name]]);


    const handleFileSelect = useCallback((files: File[]) => {
        // Get current files from Formik values
        const currentFiles = values[name];
        const existingFiles = Array.isArray(currentFiles) ? currentFiles : currentFiles ? [currentFiles] : [];
        const newFiles = [...existingFiles];

        files.forEach(file => {
            // Check if we've reached max files
            if (multiple && newFiles.length >= maxFiles) {
                return;
            }

            // Check for duplicate files
            const isDuplicate = newFiles.some(existingFile => 
                existingFile.name === file.name && existingFile.size === file.size
            );
            
            if (!isDuplicate) {
                newFiles.push(file);
            }
        });
        
        // Update Formik directly - selectedFiles will be derived automatically
        setFieldValue(name, multiple ? newFiles : newFiles[0] || null);
        
        if (customHandleChange) {
            customHandleChange(multiple ? newFiles : newFiles[0] || null);
        }
        
        // Clear the file input to allow re-selecting the same files
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [name, maxFiles, multiple, values, setFieldValue, customHandleChange]);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        
        if (disabled) return;

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFileSelect(files);
        }
    }, [handleFileSelect, disabled]);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!disabled) {
            setIsDragOver(true);
        }
    }, [disabled]);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileSelect(Array.from(files));
        }
    };

    const handleBrowseClick = () => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleRemoveFile = (fileToRemove?: File) => {
        if (fileToRemove) {
            // Remove specific file

            const newFiles = selectedFiles.filter(file =>
                !(file.name === fileToRemove.name && file.size === fileToRemove.size)
            );
            // Update Formik directly - selectedFiles will be derived automatically
            setFieldValue(name, multiple ? newFiles : newFiles[0] || null);
            if (customHandleChange) {
                customHandleChange(multiple ? newFiles : newFiles[0] || null);
            }
        } else {
            // Remove all files (only when explicitly called without a specific file)
            setFieldValue(name, multiple ? [] : null);
            if (customHandleChange) {
                customHandleChange(multiple ? [] : null);
            }
        }
        
        // Always clear the file input to allow re-selecting files
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="form-field mb-5">

            <div className="relative">
                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={acceptedTypes.join(',')}
                    onChange={handleFileInputChange}
                    className="hidden"
                    disabled={disabled}
                    multiple={multiple}
                />

                {/* Drop zone */}
                <div
                    className={`
                        relative border border-dashed border-primary/10 p-8 text-center cursor-pointer transition-all duration-200 rounded-md
                        ${isDragOver
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }
                        ${disabled
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-primary/10'
                        }
                        ${errors?.[name] && touched?.[name]
                            ? 'border-red-500'
                            : ''
                        }
                    `}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={handleBrowseClick}
                >
                    {/* Always show upload area */}
                    <div className="space-y-4">
                        <div className="w-10 h-10 mx-auto bg-[#092C22] flex items-center justify-center mb-3">
                            <PiExportLight className="text-primary" />
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-white text-center text-sm font-chivo-regular font-normal leading-base mb-1">
                                {placeholder || (multiple ? "Drag & drop or" : "Drag & drop or")}{" "}
                                <span className="underline cursor-pointer">Choose File</span>{" "}
                                to upload
                            </p>
                            <p className="text-[#909090] text-center text-xs font-chivo-regular font-[300] leading-base">
                                Image Format: JPEG, PNG 3MB Max
                            </p>
                        </div>
                    </div>
                </div>

                {/* Selected files display - outside the upload box */}
                {selectedFiles.length > 0 && showPreview && (
                    <div className="mt-4 space-y-3">
                        <div className="space-y-2">
                            {selectedFiles.map((file, index) => {
                                const isImage = file.type.startsWith("image/");
                                const previewUrl = isImage ? URL.createObjectURL(file) : null;

                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        {isImage && previewUrl && (
                                            <div className="relative group w-[50px] h-[50px] flex-shrink-0">
                                                <img
                                                    src={previewUrl}
                                                    alt={file.name}
                                                    onLoad={() => URL.revokeObjectURL(previewUrl)}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => handleRemoveFile(file)}
                                                >
                                                    <LuTrash2 className="text-white" />
                                                </button>
                                            </div>
                                        )}

                                        {!isImage && (
                                            <LuTrash2
                                                className="text-red-600 cursor-pointer"
                                                onClick={() => handleRemoveFile(file)}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Error message */}
                <FieldError
                    errors={hasError ? [{ message: errors[name] as string }] : []}
                />
            </div>
        </div>
    );
};

export default ImagePicker;