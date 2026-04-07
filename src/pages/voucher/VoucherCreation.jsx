/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { Form, Button, Modal, Divider, notification, Collapse } from "antd";
import dayjs from "dayjs";
import InputField from "../../component/form/InputField";
import { useLocation } from "react-router-dom";
import {
  CLASSIFICATION_TYPE,
  ELLIGIBLE_PRODUCT_CODE,
  PARTNERS_OPTIONS,
  PROMO_REWARD_TYPE,
  PROMO_TYPE,
  ASSIGNMENT_EXPLICITY_TYPE,
  VOUCHER_TYPE,
  VOUCHER_CREATION_TYPE,
  VOUCHER_FORM_PREFILL_VALUES,
  DISPLAY_TAGS,
  PARTNER_OPTIONS,
} from "../../common/constant";
import downloadTemplate from "../../common/downloadExcel";
import moment from "moment";
import { FaDeleteLeft } from "react-icons/fa6";
import _ from "lodash";

const VoucherCreation = () => {
  const location = useLocation();

  const [voucherCreationType, setVoucherCreationType] = useState({
    defaultValue: "",
    options: [],
  });

  const [selectedVoucherType, setSelectedVoucherType] = useState(
    VOUCHER_TYPE?.[0]?.value,
  );
  const [selectedUsageType, setSelectedUsageType] = useState("");

  const [selectedPromoType, setSelectedPromoType] = useState();
  const [isJsonPreviewOpen, setIsJsonPreviewOpen] = useState(false);

  const [voucherType, setVoucherType] = useState();

  const [customerDetails, setCustomerDetails] = useState(null);

  const [form] = Form.useForm();

  const formatDate = (dateValue) => {
    if (!dateValue) return "";
    if (typeof dateValue?.format === "function") {
      return dateValue.format("YYYY-MM-DD");
    }
    return dateValue;
  };

  const nowAsIso = () => new Date().toISOString();
  const todayAsDate = () => new Date().toISOString().split("T")[0];

  useEffect(() => {
    const creationType =
      location?.state?.type || VOUCHER_CREATION_TYPE.SINGLIFE;
    const partnerOptions = PARTNERS_OPTIONS[creationType] || [];
    const defaultPromoEntity = partnerOptions?.[0]?.value || "";
    //     if (creationType === VOUCHER_CREATION_TYPE.THIRDPARTY) {
    //       setVoucherType(
    //         VOUCHER_TYPE.filter((item) => item.value !== "SINGLIFE_CREDITS"),
    //       );
    //     } else {
    //       setVoucherType(VOUCHER_TYPE);
    //     }
    setVoucherType(VOUCHER_TYPE);

    setVoucherCreationType({
      defaultValue: defaultPromoEntity,
      options: partnerOptions,
    });
    form.setFieldsValue({
      promoEntity: defaultPromoEntity,
      type: "",
      eligibleProductCode: ELLIGIBLE_PRODUCT_CODE.map((item) => item.value),
      classification: CLASSIFICATION_TYPE?.[0]?.value,
      promoRewardType: PROMO_REWARD_TYPE?.[0]?.value,
      assignmentExplicity: ASSIGNMENT_EXPLICITY_TYPE?.[0]?.value,
      voucherType: VOUCHER_TYPE?.[0]?.value,
    });
    setSelectedPromoType();
    setSelectedUsageType(ASSIGNMENT_EXPLICITY_TYPE?.[0]?.value);
    setSelectedVoucherType(VOUCHER_TYPE?.[0]?.value);
  }, [location?.state?.type, form]);

  const buildVoucherJson = (values) => {
    const parsedDescription = (values?.description || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const promoConfig = {
      promoCode: values?.promoCode || "",
      created: "",
      createdDate: todayAsDate(),
      creditAmount: Number(values?.amount || 0),
      customerLimitCount: 0,
      drawerMessageJson: [
        {
          description: parsedDescription,
          title: values?.title || "",
        },
        {
          button: values?.button || "",
          navigation: values?.navigation || "",
        },
      ],
      eligibleCustomerCount: 0,
      endDate: formatDate(values?.endDate),
      isActive: 1,
      leadFormEnabled: false,
      modified: nowAsIso(),
      objectMap: {},
      paidBy: "Singlife Philippines",
      promoCodeLength: 6,
      promoEntity: values?.promoEntity || "",
      promoName: values?.promoName || "",
      promoPrefix: "",
      promoRewardType: values?.promoRewardType || "",
      promoValidity: "",
      startDate: formatDate(values?.startDate),
      type: values?.type || VOUCHER_TYPE?.[0]?.value,
      updatedDate: todayAsDate(),
      seriesCode: values?.seriesCode || "",
      display_tags: DISPLAY_TAGS.includes(values?.type),
      voucherConfig: {
        amount: Number(values?.amount || 0),
        assignmentExplicity: values?.assignmentExplicity || "",
        category: "G",
        classification:
          values?.classification || CLASSIFICATION_TYPE?.[0]?.value,
        codeGenerateMethod: "API",
        durationInDays: Number(values?.durationInDays || 0),
        eligibleProductCodes: values?.eligibleProductCode || [],
        generateNotifType: {},
        redeemMaxLimit: Number(values?.redeemMaxLimit || 0),
        redeemNotifType: null,
        voucherType: values?.voucherType || VOUCHER_TYPE?.[0]?.value,
      },
      voucherRedeemCount: 0,
      withCredit: false,
    };

    const seriesConfig = {
      seriesCode: values?.seriesCode || "",
      dtCreated: nowAsIso(),
      dtUpdated: nowAsIso(),
      maxRedeemLimitPerUser: Number(values?.maxRedeemLimitPerUser || 0),
      seriesName: values?.seriesName || "",
      updatedBy: "System",
    };

    return { promoConfig, seriesConfig };
  };

  const showJsonPreview = (values) => {
    const { title, description, button, navigation } = form.getFieldsValue([
      "title",
      "description",
      "button",
      "navigation",
    ]);

    const count = _.compact(
      Object.values({ title, description, button, navigation }),
    ).length;

    if (count > 1 && count != 4) {
      notification.error({
        message: "Please fill all the drawer message fields",
      });
      return;
    }

    const payload = buildVoucherJson(values);
    setIsJsonPreviewOpen(payload);
  };

  const handlePromoTypeChange = (value) => {
    if (value != PROMO_TYPE?.[0]?.value) {
      form.setFieldsValue({
        eligibleProductCode: [],
      });
    }
    setSelectedPromoType(value);
  };

  const handleFillForm = () => {
    const defaultPromoEntity =
      voucherCreationType?.defaultValue ||
      voucherCreationType?.options?.[0]?.value ||
      "";

    const nextValues = {
      ...VOUCHER_FORM_PREFILL_VALUES,
      promoEntity: defaultPromoEntity,
      promoRewardType: PROMO_REWARD_TYPE?.[0]?.value,
      startDate: dayjs(VOUCHER_FORM_PREFILL_VALUES.startDate),
      endDate: dayjs(VOUCHER_FORM_PREFILL_VALUES.endDate),
      voucherStartDate: dayjs(VOUCHER_FORM_PREFILL_VALUES.voucherStartDate),
      voucherEndDate: dayjs(VOUCHER_FORM_PREFILL_VALUES.voucherEndDate),
      partner: PARTNER_OPTIONS?.[0]?.value,
    };

    form.setFieldsValue(nextValues);
    setSelectedPromoType();
    setSelectedVoucherType(VOUCHER_TYPE?.[0]?.value);
    setSelectedUsageType(ASSIGNMENT_EXPLICITY_TYPE?.[0]?.value);
  };

  const validatePartnerAndPromoCode = () => {
    const { partner, promoCode } = form.getFieldsValue([
      "partner",
      "promoCode",
    ]);
    let fileName = `${partner}_${promoCode}_EmployeeList_${moment().format("DDMMYYYY")}`;
    if (!partner || !promoCode) {
      notification.error({
        message: "Please check both the partner and promo code inputs",
      });
      return { success: false, fileName: null };
    }
    return { success: true, fileName: fileName };
  };

  const handleTrigerDownloadTemplate = () => {
    const { fileName, success } = validatePartnerAndPromoCode();

    if (success) {
      downloadTemplate(fileName);
    }
  };

  const handleUploadCustomerDetails = (value) => {
    if (value?.file?.status === "error") {
      const { fileName, success } = validatePartnerAndPromoCode();

      if (success) {
        console.log(value?.file.name, fileName);
        if (value?.file.name !== `${fileName}.xlsx`) {
          notification.error({
            message: `Please upload file with the correct name expected : ${fileName}`,
          });
          return;
        }
      }
      setCustomerDetails(fileName);
    }
  };

  return (
    <>
      <div className="min-h-screen  p-4 md:p-8   bg-slate-100 w-full">
        <div className="mx-auto rounded-3xl  px-10 backdrop-blur-xl md:p-7 w-full">
          <Form
            form={form}
            layout="vertical"
            onFinish={showJsonPreview}
            className="space-y-1"
          >
            <Collapse defaultActiveKey={[2, 3, 4]} collapsible="icon">
              <div className="flex flex-col gap-3 bg-red-500 p-5 text-white md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-xl font-bold md:text-2xl">
                    Voucher Configuration
                  </h1>
                  <p className="text-sm text-white/90">
                    Compact single-view setup for series, promo, and voucher
                    details
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleFillForm}
                    className="!h-10 !rounded-lg !border-0 !bg-white/90 !px-4 !font-medium !text-slate-700 hover:!bg-white"
                  >
                    Fill
                  </Button>
                  <Button
                    htmlType="submit"
                    className="!h-10 !rounded-lg !border-0 !bg-black/80 !px-4 !font-medium !text-white hover:!bg-black"
                  >
                    View JSON
                  </Button>
                  <Button
                    onClick={() => form.resetFields()}
                    className="!h-10 !rounded-lg !border-0 !bg-white/90 !px-4 !font-medium !text-slate-700 hover:!bg-white"
                  >
                    Reset
                  </Button>
                </div>
              </div>

              <Collapse.Panel
                collapsible="disabled"
                className="!bg-white"
                key={2}
                header={
                  <h2 className="text-sm font-semibold uppercase tracking-wide !text-red-500">
                    Promo Configuration
                  </h2>
                }
              >
                <div className="bg-white p-4 ">
                  <div className="flex flex-wrap gap-x-4">
                    <InputField
                      label="Promo Entity"
                      name="promoEntity"
                      type="select"
                      defaultValue={voucherCreationType?.defaultValue}
                      options={voucherCreationType?.options}
                      rules={[
                        {
                          required: true,
                          message: "Please enter the promo name",
                        },
                      ]}
                    />
                    <InputField
                      label="Promo Name"
                      name="promoName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the promo name",
                        },
                      ]}
                    />
                    <InputField
                      type="select"
                      label="Partner"
                      name="partner"
                      options={PARTNER_OPTIONS}
                      rules={[
                        {
                          required: true,
                          message: "Please select the partner",
                        },
                      ]}
                    />
                    <InputField
                      label="Promo Code"
                      name="promoCode"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the promo code",
                        },
                      ]}
                    />
                    <InputField
                      label="Type"
                      name="type"
                      type="select"
                      options={PROMO_TYPE}
                      getValue={true}
                      value={selectedPromoType}
                      onChange={(value) => {
                        handlePromoTypeChange(value);
                      }}
                    />
                    {DISPLAY_TAGS.includes(selectedPromoType) && (
                      <InputField
                        label="Event Key"
                        name="eventKey"
                        rules={[
                          {
                            required: true,
                            message: "Please enter the event key",
                          },
                        ]}
                      />
                    )}

                    <InputField
                      type="date"
                      label="Start Date"
                      name="startDate"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the start date",
                        },
                      ]}
                    />
                    <InputField
                      type="date"
                      label="End Date"
                      name="endDate"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the end date",
                        },
                      ]}
                    />

                    <InputField
                      label="Promo Reward Type"
                      name="promoRewardType"
                      type="select"
                      defaultValue={PROMO_REWARD_TYPE?.[0]?.value}
                      options={PROMO_REWARD_TYPE}
                      rules={[
                        {
                          required: true,
                          message: "Please enter the promo reward type",
                        },
                      ]}
                    />
                  </div>
                </div>
              </Collapse.Panel>
              <Collapse.Panel
                key={3}
                collapsible="disabled"
                className="!bg-white"
                header={
                  <h2 className="text-sm font-semibold uppercase tracking-wide !text-red-500">
                    Series Configuration
                  </h2>
                }
              >
                <div className="bg-white p-4 ">
                  <div className="flex flex-wrap gap-x-4">
                    <InputField
                      label="Series Code"
                      name="seriesCode"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the series code",
                        },
                      ]}
                    />
                    <InputField
                      label="Series Name"
                      name="seriesName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the series name",
                        },
                      ]}
                    />
                    <InputField
                      type="number"
                      label="Max Redeem Limit Per User"
                      name="maxRedeemLimitPerUser"
                      defaultValue={1}
                      rules={[
                        {
                          required: true,
                          message: "Please enter maximum redeem limit per user",
                        },
                      ]}
                    />
                  </div>
                </div>
              </Collapse.Panel>
              <Collapse.Panel
                key={4}
                collapsible="disabled"
                className="!bg-white"
                header={
                  <h2 className="text-sm font-semibold uppercase tracking-wide !text-red-500">
                    Voucher Configuration
                  </h2>
                }
              >
                <div className="bg-white p-4 ">
                  <div className="flex flex-wrap gap-x-4">
                    <InputField
                      type="select"
                      label="assignmentExplicity"
                      name="assignmentExplicity"
                      defaultValue={ASSIGNMENT_EXPLICITY_TYPE?.[0]?.value}
                      options={ASSIGNMENT_EXPLICITY_TYPE}
                      getValue={true}
                      onChange={(value) => {
                        setSelectedUsageType(value);
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please select the assignmentExplicity",
                        },
                      ]}
                    />
                    {ASSIGNMENT_EXPLICITY_TYPE?.[0]?.value ===
                      selectedUsageType && (
                      <>
                        {customerDetails ? (
                          <div className="flex items-center gap-2">
                            <h1>{customerDetails} </h1>
                            <FaDeleteLeft
                              className="cursor-pointer text-red-500"
                              onClick={() => setCustomerDetails(null)}
                            />
                          </div>
                        ) : (
                          <InputField
                            type="upload"
                            handleUploadCustomerDetails={(value) =>
                              handleUploadCustomerDetails(value)
                            }
                            label="Upload Customer Details Excel file"
                            name="customerDetailsExcelFile"
                            accept=".xlsx"
                            downloadTemplate={() =>
                              handleTrigerDownloadTemplate()
                            }
                            rules={[
                              {
                                required: true,
                                message:
                                  "Please upload the customer details excel file",
                              },
                            ]}
                          />
                        )}
                      </>
                    )}
                    <InputField
                      type="select"
                      label="Voucher Type"
                      name="voucherType"
                      defaultValue={VOUCHER_TYPE?.[0]?.value}
                      options={voucherType}
                      getValue={true}
                      value={selectedVoucherType}
                      onChange={(value) => {
                        setSelectedVoucherType(value);
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please select the voucher type",
                        },
                      ]}
                    />
                    {VOUCHER_TYPE?.[0]?.value === selectedVoucherType && (
                      <InputField
                        type="select"
                        label="Elligible Product List"
                        name="eligibleProductCode"
                        multiple={true}
                        defaultValue={ELLIGIBLE_PRODUCT_CODE?.[0]?.value}
                        options={ELLIGIBLE_PRODUCT_CODE}
                        rules={[
                          {
                            required: true,
                            message: "Please select the eligible product code",
                          },
                        ]}
                      />
                    )}
                    <InputField
                      label="Amount"
                      name="amount"
                      rules={[
                        { required: true, message: "Please enter the amount" },
                      ]}
                      type="number"
                    />
                    <InputField
                      type="select"
                      label="Classification"
                      name="classification"
                      defaultValue={CLASSIFICATION_TYPE?.[0]?.value}
                      options={CLASSIFICATION_TYPE}
                      rules={[
                        {
                          required: true,
                          message: "Please select the classification",
                        },
                      ]}
                    />
                    <InputField
                      label="Duration in Days"
                      name="durationInDays"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the duration in days",
                        },
                      ]}
                      type="number"
                    />
                    <InputField
                      label="Redeem Max Limit"
                      name="redeemMaxLimit"
                      defaultValue={1}
                      rules={[
                        {
                          required: true,
                          message: "Please enter the redeem max limit",
                        },
                      ]}
                      type="number"
                    />
                  </div>
                </div>
              </Collapse.Panel>
              <Collapse.Panel
                key={5}
                className="!bg-white"
                header={
                  <h2 className="text-sm font-semibold uppercase tracking-wide !text-red-500">
                    Drawer Message Configuration
                  </h2>
                }
              >
                <div className="bg-white p-4">
                  <div className="flex flex-wrap gap-x-4 w-full">
                    <InputField
                      label="Title"
                      name="title"
                      itemClassName="!w-full"
                      //       rules={[
                      //         {
                      //           required: true,
                      //           message: "Please enter the drawer message title",
                      //         },
                      //       ]}
                    />

                    <InputField
                      label="Description"
                      name="description"
                      type="textarea"
                      itemClassName="!w-full"
                      //       rules={[
                      //         {
                      //           required: true,
                      //           message:
                      //             "Please enter the drawer message description",
                      //         },
                      //       ]}
                    />
                    <Divider />
                    <InputField
                      label="Button Label"
                      name="button"
                      //       rules={[
                      //         {
                      //           required: true,
                      //           message:
                      //             "Please enter the drawer message button text",
                      //         },
                      //       ]}
                    />
                    <InputField
                      label="Navigation"
                      name="navigation"
                      //       rules={[
                      //         {
                      //           required: true,
                      //           message:
                      //             "Please enter the drawer message button text",
                      //         },
                      //       ]}
                    />
                  </div>
                </div>
              </Collapse.Panel>
            </Collapse>
          </Form>
        </div>
      </div>
      <Modal
        title="Voucher Configuration JSON"
        open={isJsonPreviewOpen}
        onCancel={() => {
          setIsJsonPreviewOpen(false);
        }}
        footer={null}
        width="80%"
        height="80%"
      >
        <pre className=" overflow-auto rounded-md p-4 text-xs text-slate-800 h-[80vh]">
          {JSON.stringify(isJsonPreviewOpen, null, 2)}
        </pre>
      </Modal>
    </>
  );
};

export default VoucherCreation;
