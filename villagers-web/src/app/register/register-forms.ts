export const surveyJSON = {
  pages: [
    {
      name: 'page1',
      elements: [
        {
          type: 'text',
          name: 'firstname',
          title: 'ชื่อ ( Firstname )',
          isRequired: true,
          requiredErrorText: 'กรุณากรอกชื่อ ( please fill your firstname )',
          placeHolder:
            'ระบุชื่อ #ไม่ต้องระบุคำนำหน้าชื่อ ( fill your firstname )',
        },
        {
          type: 'text',
          name: 'lastname',
          title: 'นามสกุล ( Lastname )',
          isRequired: true,
          requiredErrorText: 'กรุณากรอกนามสกุล ( please fill your lastname )',
          placeHolder: 'ระบุนามสกุล ( fill your lastname )',
        },
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
        },
        {
          type: 'text',
          name: 'phoneNumber',
          title: 'หมายเลขโทรศัพท์มือถือที่ติดต่อได้ ( Mobile phone number )',
          isRequired: true,
          requiredErrorText:
            'กรุณากรอกหมายเลขโทรศัพท์มือถือที่ติดต่อได้ ( please fill your mobile phone number )',
          validators: [
            {
              type: 'regex',
              text: 'หมายเลขโทรศัพท์มือถือไม่ถูกต้อง',
              regex: '^[0-9]*$',
            },
          ],
          maxLength: 10,
          placeHolder: '00-00000000',
        },
        {
          type: 'panel',
          name: 'address',
          elements: [
            {
              type: 'text',
              name: 'homeNumber',
              title: 'บ้านเลขที่ ( House number )',
              isRequired: true,
              requiredErrorText:
                'กรุณากรอกบ้านเลขที่ ( please fill your house number )',
              placeHolder: 'บ้านเลขที่ ( House number )',
            },
            {
              type: 'text',
              name: 'homeMoo',
              title: 'หมู่ที่',
              placeHolder: 'หมู่ที่',
            },
            {
              type: 'text',
              name: 'homeMooban',
              title: 'หมู่บ้าน/อาคาร/ชั้น (  Village / Building / Floor )',
              placeHolder:
                'หมู่บ้าน/อาคาร/ชั้น (  Village / Building / Floor )',
            },
            {
              type: 'text',
              name: 'homeSoi',
              title: 'ตรอก/ซอย ( Alley )',
              placeHolder: 'ตรอก/ซอย ( Alley )',
            },
            {
              type: 'text',
              name: 'homeRoad',
              title: 'ถนน ( Road )',
              placeHolder: 'ถนน ( Road )',
            },
            {
              type: 'text',
              name: 'homePostalCode',
              title: 'รหัสไปรษณีย์ ( Postal code )',
              isRequired: true,
              requiredErrorText:
                'กรุณากรอกรหัสไปรษณีย์ ( please fill your postal code )',
              placeHolder: 'รหัสไปรษณีย์ ( Postal code )',
            },
            {
              type: 'text',
              name: 'homeSubDistrict',
              title: 'ตำบล/แขวง ( Sub-district )',
              isRequired: true,
              requiredErrorText:
                'กรุณากรอกตำบล/แขวง ( please fill your sub-district )',
              placeHolder: 'ตำบล/แขวง ( Sub-district )',
            },
            {
              type: 'text',
              name: 'homeDistrict',
              title: 'อำเภอ/เขต ( District )',
              isRequired: true,
              requiredErrorText:
                'กรุณากรอกอำเภอ/เขต ( please fill your district )',
              placeHolder: 'อำเภอ/เขต ( District )',
            },
            {
              type: 'text',
              name: 'homeProvince',
              title: 'จังหวัด ( Province )',
              isRequired: true,
              requiredErrorText:
                'กรุณากรอกจังหวัด ( please fill your province)',
              placeHolder: 'จังหวัด ( Province )',
            },
          ],
          title: 'ที่อยู่ปัจจุบัน ( Current Address )',
          state: 'expanded',
        },
        {
          type: 'checkbox',
          name: 'allergies',
          title:
            'ข้อมูลสำหรับการจัดเตรียมอาหาร ( Information for food preparation )',
          choices: [
            {
              value: 'NO_SEA_FOOD',
              text: 'ไม่สามารถทานอาหารทะเลได้ (  Cannot eat seafood )',
            },
            {
              value: 'NO_MILK',
              text:
                "แพ้อาหารที่ผสมนมวัว ( Cannot eat foods containing cow's milk )",
            },
            {
              value: 'NO_BEAN',
              text: 'ไม่สามารถทานอาหารประเภทถั่วได้ ( Cannot eat beans )',
            },
            {
              value: 'NO_PORK',
              text: 'ไม่ทานเนื้อหมู ( Not eating pork )',
            },
            {
              value: 'NO_CHICKEN',
              text: 'ไม่ทานไก่ ( Not eating chicken )',
            },
            {
              value: 'NO_MEAT',
              text: 'ไม่ทานเนื้อสัตว์ทั้งหมด ( Not eating all the meat )',
            },
          ],
        },
        {
          type: 'checkbox',
          name: 'disease',
          title: 'โรคประจำตัว ( Congenital disease )',
          choices: [
            {
              value: 'DIABETES',
              text: 'โรคเบาหวาน ( Diabetes )',
            },
            {
              value: 'GOUT',
              text: 'โรคเก๊า ( Gout )',
            },
            {
              value: 'HEART_DISEASE',
              text: 'โรคหัวใจ ( Heart disease )',
            },
          ],
        },
      ],
    },
    {
      name: 'page2',
      elements: [
        {
          type: 'paneldynamic',
          name: 'members',
          title: 'ข้อมูลสมาชิกในครอบครัว ( Family information )',
          templateElements: [
            {
              type: 'text',
              name: 'firstname',
              title: 'ชื่อ ( Firstname )',
              isRequired: true,
              requiredErrorText: 'กรุณากรอกชื่อ ( please fill your firstname )',
              placeHolder:
                'ระบุชื่อ #ไม่ต้องระบุคำนำหน้าชื่อ ( fill your firstname )',
            },
            {
              type: 'text',
              name: 'lastname',
              title: 'นามสกุล ( Lastname )',
              isRequired: true,
              requiredErrorText:
                'กรุณากรอกนามสกุล ( please fill your lastname )',
              placeHolder: 'ระบุนามสกุล ( fill your lastname )',
            },
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
            },
            {
              type: 'checkbox',
              name: 'allergies',
              title:
                'ข้อมูลสำหรับการจัดเตรียมอาหาร ( Information for food preparation )',
              choices: [
                {
                  value: 'NO_SEA_FOOD',
                  text: 'ไม่สามารถทานอาหารทะเลได้ (  Cannot eat seafood )',
                },
                {
                  value: 'NO_MILK',
                  text:
                    "แพ้อาหารที่ผสมนมวัว ( Cannot eat foods containing cow's milk )",
                },
                {
                  value: 'NO_BEAN',
                  text: 'ไม่สามารถทานอาหารประเภทถั่วได้ ( Cannot eat beans )',
                },
                {
                  value: 'NO_PORK',
                  text: 'ไม่ทานเนื้อหมู ( Not eating pork )',
                },
                {
                  value: 'NO_CHICKEN',
                  text: 'ไม่ทานไก่ ( Not eating chicken )',
                },
                {
                  value: 'NO_MEAT',
                  text: 'ไม่ทานเนื้อสัตว์ทั้งหมด ( Not eating all the meat )',
                },
              ],
            },
            {
              type: 'checkbox',
              name: 'disease',
              title: 'โรคประจำตัว ( Congenital disease )',
              choices: [
                {
                  value: 'DIABETES',
                  text: 'โรคเบาหวาน ( Diabetes )',
                },
                {
                  value: 'GOUT',
                  text: 'โรคเก๊า ( Gout )',
                },
                {
                  value: 'HEART_DISEASE',
                  text: 'โรคหัวใจ ( Heart disease )',
                },
              ],
            },
          ],
          templateTitle:
            'ระบุข้อมูลสมาชิกครอบครัวในบ้านของท่านเพื่อให้เจ้าหน้าที่ทำการจัดสรรอาหารให้แก่ท่านได้อย่างเหมาะสม ( Provide family member information in your home so that staff can allocate food appropriately for you.)',
        },
      ],
    },
  ],
  questionErrorLocation: 'bottom',
  requiredText: '',
  pagePrevText: 'ย้อนกลับ',
  pageNextText: 'ถัดไป',
  completeText: 'เสร็จสิ้น',
};
