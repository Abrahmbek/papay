
const MemberModel = require("../schema/member.model");
const assert = require("assert");
const Definer = require("../lib/mistake");
const { shapeIntoMongooseObjectId } = require("../lib/config");
const Member = require("../models/Member");
//const { exec } = require("child_process");


class Restaurant {

    constructor() {
        this.memberModel = MemberModel;
    }
     
    async getResrtaurantsData(member, data)  {                   //member va datani qabul qilib olyapmiz
        try{
          const auth_mb_id = shapeIntoMongooseObjectId(member?._id);   // kim login bolib request qilyapkan bolsa oshani member id si kerak  //? agar mavjud bolsa
          let match = {mb_type: "RESTAURANT", mb_status: "ACTIVE"};    // searching qilish maqsasdida match ozgaruchi objectini hosil qilib olamiz
          let aggregationQuery =[];      // bu yerda yan bir array ni nhosil qilib olamiz
          data.limit = data["limit"] * 1;     //  data ni limiti string korinishida kelyapti uni biz songa aylantirib olamiz
          data.page = data["page"] * 1;
           
          switch (data.order) {     // datni ichida kelyapkan orderga swicht qilish niyatida
            case "top":
                match['mb_top'] = "Y";
                aggregationQuery.push({$match: match});      // array bolganigi uchun push qilamiz  //mongo db ni match buyrugiga tenglashtiramiz
                aggregationQuery.push({$sample: {size: data.limit} });  //  sample bu random shaklida tanlaydi bizni top restaurantlarni har safar har hil restolarni ornini ozgartirib chiqarib beradi
                break;
            case "random":
                aggregationQuery.push({$match: match});
                aggregationQuery.push({$sample: {size: data.limit} });  // resto kartimizda chiqishiga ruxsat beramiz
                break;
            default: 
            aggregationQuery.push({$match: match});
            const sort ={[data.order]: -1};
            aggregationQuery.push({$sort: sort});    // sort sintaksizni   sort objectimizga tenglash tirib olamiz
          }

        // xar uchalasiga tegishli bolganligi uchun tashqarida yozib olyapmiz
          aggregationQuery.push({$skip: (data.page - 1) * data.limit});     // pagelani skip qilib beradi masalan bizaga 4 tta kerak bolsa 4 ttani oladi qolganini skip qilib yuboradi
          aggregationQuery.push({$limit: data.limit});
          //member liked target

          const result = await  this.memberModel.aggregate(aggregationQuery).exec();  // memberschemamodeldan aggregate qilamiz va aggregation query qiyamtlarini oladi
          assert.ok( result, Definer.general_err1);   //assert orqali tekshirib olamiz
          return result;
        } catch(err){

        }
    }
async getChosenResrtaurantData(member, id) {     //database ni schema modeli bilan ishlyapkanligi uchun async qilib oluapmiz
        try{
           id = shapeIntoMongooseObjectId(id);

    if(member) {
      const member_obj = new Member();
     await member_obj.viewChosenItemByMember(member, id, "member");
     }

     const result = await this.memberModel    // result objectini this.membermodel orqali hosil qilamiz
     .findOne({                         
        _id: id,
        mb_status: "ACTIVE",
     })
     .exec();
     assert.ok(result, Definer.general_err2);

     return result;
        }catch(err) {
          throw err;
        }
    }


    async getAllRestaurantsData() {
        try{
           const result = await  this.memberModel
            .find({
                mb_type: "RESTAURANT",
            })
            .exec();

            assert(result, Definer.general_err1);
            return result;
        }catch(err) {
          throw err;
        }
    }

    async updateRestaurantByAdminData(update_data) {
        try {
          const id =shapeIntoMongooseObjectId(update_data?.id);
          const result = await this.memberModel
          .findByIdAndUpdate(
            {_id: id},
            update_data,
            {runValidators: true,
             lean: true,
             returnDocument: "after",
        })
        .exec();

        assert.ok(result, Definer.general_err1);
        return result;
        } catch(err) {
            throw err;
        }
    }
}



module.exports = Restaurant;