export const surveyJSON = {
  pages: [
    {
      name: 'page1',
      elements: [
        {
          type: 'radiogroup',
          name: 'isUsePassport',
          title:
            'คุณใช้หลักฐานใดในการยืนยันตัวตน? ( What evidence do you use to confirm your identity ? )',
          defaultValue: 'false',
          choices: [
            {
              value: 'false',
              text:
                'ใช้หมายเลขบัตรประจำตัวประชาชน ( National identification number )',
            },
            {
              value: 'true',
              text: 'ใช้หมายเลขพาสปอร์ต ( Passport number )',
            },
          ],
        },
        {
          type: 'text',
          name: 'nationalId',
          title:
            'หมายเลขบัตรประจำตัวประชาชน หรือ พาสปอร์ต ( National identification number or Passport number )',
          isRequired: true,
          requiredErrorText:
            'กรุณากรอกหมายเลขบัตรประจำตัวประชาชน หรือ พาสปอร์ต ( please fill your national id or passport number )',
          maxLength: 13,
          placeHolder:
            'ระบุหมายเลขบัตรประจำตัวประชาชน 13 หลัก หรือ หมายเลขพาสปอร์ต ( fill your national id or passport number )',
          validators: [
            {
              type: 'expression',
              expression: 'checkNationalId({nationalId}, {isUsePassport})',
              text: 'คุณกรอกหมายเลขบัตรประชาชนไม่ถูกต้อง',
            },
          ],
        },
        {
          type: 'text',
          name: 'phoneNumber',
          title: 'หมายเลขโทรศัพท์มือถือ ( Mobile phone number )',
          isRequired: true,
          requiredErrorText:
            'กรุณากรอกหมายเลขโทรศัพท์มือถือ ( please fill your mobile phone number )',
          validators: [
            {
              type: 'regex',
              text: 'หมายเลขโทรศัพท์มือถือไม่ถูกต้อง',
              regex: '^[0-9]*$',
            },
          ],
          maxLength: 10,
          placeHolder: '0xxxxxxxxx',
        },
      ],
    },
  ],
  questionErrorLocation: 'bottom',
  requiredText: '',
  pagePrevText: 'ย้อนกลับ',
  pageNextText: 'ถัดไป',
  completeText: 'ร้องขอ QR code',
  showCompletedPage: false,
}
