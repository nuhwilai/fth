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
          placeHolder: '0xxxxxxxxx',
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
          ],
          title: 'ที่อยู่ปัจจุบัน ต.กะรน อ.เมืองภูเก็ต จ.ภูเก็ต ( Current Address at Karon, Phuket )',
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
          name: 'diseases',
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
            {
              value: 'BLOOD_PRESSURE',
              text: 'โรคความดัน ( Blood pressure )',
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
          title: 'ข้อมูลสมาชิกในครอบครัวไม่รวมตัวเอง ( Family information not include yourself )',
          panelAddText: '+ เพิ่มสมาชิก',
          processedTitle : 'สมาชิกคนที่ ',
          panelRemoveText: 'remove',
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
              validators: [
                {
                  type: 'expression',
                  expression:
                    'checkNationalId({panel.nationalId}, {panel.isUsePassport})',
                  text: 'คุณกรอกหมายเลขบัตรประชาชนไม่ถูกต้อง',
                },
              ],
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
              name: 'diseases',
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
                {
                  value: 'BLOOD_PRESSURE',
                  text: 'โรคความดัน ( Blood pressure )',
                },
              ],
            },
          ],
          showQuestionNumbers: 'onPanel',
          templateTitle:
            'ข้อมูลสมาชิกคนที่ {panelIndex} ( Family member #{panelIndex} )',
        },
        {
          type: 'comment',
          name: 'remark',
          title: 'คำร้องขออื่นๆ ( Other requests )',
        },
      ],
    },
  ],
  questionErrorLocation: 'bottom',
  requiredText: '',
  pagePrevText: 'ย้อนกลับ',
  pageNextText: 'ถัดไป',
  completeText: 'เสร็จสิ้น',
  showCompletedPage: false,
}

export const mockResult = {
  firstname: 'ธนพนธ์',
  lastname: 'ท่อประสิทธิ์',
  isUsePassport: 'false',
  nationalId: '1100801188111',
  phoneNumber: '0993023911',
  homeNumber: '3/186',
  homeMoo: '2',
  homePostalCode: '90000',
  homeSubDistrict: 'เขารูปช้าง',
  homeDistrict: 'เมือง',
  homeProvince: 'สงขลา',
  allergies: ['NO_SEA_FOOD', 'NO_MEAT'],
  diseases: ['GOUT'],
  members: [
    {
      isUsePassport: 'false',
      firstname: 'ธนพนธ์2222',
      lastname: 'ท่อประสิทธิ์222',
      nationalId: '1100801188111',
      allergies: ['NO_MEAT', 'NO_CHICKEN', 'NO_SEA_FOOD'],
      diseases: ['DIABETES', 'HEART_DISEASE'],
    },
  ],
  remark: 'ต้องการผ้าปูที่นอนเสื่อหมอนฟูก',
}
