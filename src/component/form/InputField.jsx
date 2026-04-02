import React from "react";

import { Form, Input, DatePicker, Select, Upload, Button } from "antd";
import { FaCloudUploadAlt } from "react-icons/fa";



const InputField = ({
        label,
        name,
        rules,
        type = "text",
        rows = 3,
        placeholder,
        itemClassName = "",
        options = [],
        defaultValue,
        accept,
        onChange,
        getValue = false,
        multiple = false,
        value,
        width = "300px",
}) => {
        const commonInputClass = "!h-10 !rounded-lg";

        let fieldNode = (
                <Input
                        name={name}
                        type={type === "number" ? "number" : "text"}
                        placeholder={placeholder}
                        className={commonInputClass}

                />
        );

        if (type === "upload") {
                fieldNode = (
                        <Upload
                                name={name}
                                type={type === "number" ? "number" : "text"}
                                placeholder={placeholder}
                                className={commonInputClass}
                                accept={accept}

                        >
                                <Button icon={<FaCloudUploadAlt />}>Upload</Button>
                        </Upload>
                );
        }

        if (type === "date") {
                fieldNode = (
                        <DatePicker
                                placeholder={placeholder}
                                className="!h-10 !w-full !rounded-lg"
                        />
                );
        }

        if (type === "textarea") {
                fieldNode = (
                        <Input.TextArea
                                rows={rows}
                                placeholder={placeholder}
                                className="!rounded-lg"
                        />
                );
        }
        if (type === "select") {
                fieldNode = (
                        <Select
                                placeholder={placeholder}
                                className="!h-10 !w-full !rounded-lg"
                                defaultValue={defaultValue || value}
                                maxTagCount={1}
                                mode={multiple ? "multiple" : "default"}
                                onChange={(value) => {
                                        if (getValue) {
                                                onChange(value);
                                        }
                                }}
                                value={defaultValue || value}
                        >
                                {options.map((option) => (
                                        <Select.Option key={option.value} value={option.value}>
                                                {option.label}
                                        </Select.Option>
                                ))}
                        </Select>
                );
        }

        return (
                <Form.Item
                        label={label}
                        name={name}
                        rules={rules}
                        className={`!mb-3 ${itemClassName} !w-[${width}]`.trim()}
                >
                        {fieldNode}
                </Form.Item>
        );
};

export default InputField;