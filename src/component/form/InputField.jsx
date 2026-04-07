import React from "react";

import { Form, Input, DatePicker, Select, Upload, Button, Tooltip } from "antd";
import { FaCloudUploadAlt, FaDownload } from "react-icons/fa";

const InputField = ({
  label,
  name,
  rules,
  type = "text",
  rows = 3,
  placeholder,
  itemClassName = "!w-[300px]",
  options = [],
  defaultValue,
  accept,
  onChange,
  getValue = false,
  multiple = false,
  value,
  width = "300px",
  downloadTemplate,
  handleUploadCustomerDetails,
}) => {
  const commonInputClass = "!h-10 !rounded-lg";

  let fieldNode = (
    <Input
      name={name}
      type={type === "number" ? "number" : "text"}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={commonInputClass}
    />
  );

  if (type === "upload") {
    fieldNode = (
      <div className="flex items-center gap-2">
        <Tooltip title="Download Sample Template">
          <Button
            className="!bg-green-500 !text-white mb-2"
            icon={<FaDownload />}
            onClick={() => downloadTemplate()}
          ></Button>
        </Tooltip>
        <Upload
          name={name}
          placeholder={placeholder}
          className={commonInputClass}
          accept={accept}
          showUploadList={false}
          maxCount={1}
          onChange={(info) => {
            handleUploadCustomerDetails(info);
          }}
        >
          <Button icon={<FaCloudUploadAlt />}>Upload</Button>
        </Upload>
      </div>
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
        defaultValue={""}
        maxTagCount={1}
        allowClear
        mode={multiple ? "multiple" : "default"}
        onChange={(value) => {
          if (getValue) {
            onChange(value);
          }
        }}
        showSearch
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
