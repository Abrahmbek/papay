//const { resource } = require("../app");
const ViewModel = require("../schema/view.model");
const MemberModel =require("../schema/member.model");
const ProductModel =require("../schema/product.model");

class View {
      constructor(mb_id) {
            this.viewModel = ViewModel;
            this.memberModel = MemberModel;
            this.productModel = ProductModel
            this.mb_id = mb_id;
      }

      async validateChosenTarget(_id, group_type) {
            try{
             let result;
             switch(group_type) {
             case "member":
              result = await this.memberModel
               .findOne({
                _id: _id, 
                  mb_status: "ACTIVE",
             })
             .exec();
             break;
          case "product":
             result = await this.productModel
              .findOne({
                _id: _id, 
                  mb_status: "PROCESS",
             })
             .exec();
             break;
             }
              return !!result;
            }catch (err) {
              throw err;
            }
      }
      async insertMemberView(view_ref_id, group_type) {
            try{
            const new_view = new this.viewModel({
              mb_id: this.mb_id,
              view_ref_id: view_ref_id,
              view_group: group_type    
            });
           const result = await new_view.save();

      await this. modifyItemViewCounts(view_ref_id, group_type);
            
            return result;
            }catch (err){
             throw err;
            }
      }

        async modifyItemViewCounts(view_ref_id, group_type) {
            try{
             let result;
             switch(group_type) {
             case "member":
              await this.memberModel
             .findByIdAndUpdate(
                  {
              _id: view_ref_id,
              },
               {$inc: {mb_views: 1}})
             .exec();
             break;

              case "product":
              await this.productModel
             .findByIdAndUpdate(
                  {
              _id: view_ref_id,
              },
               {$inc: {product_views: 1}})
             .exec();
             break;
             }
             return true;
            }catch (err){
             throw err;
            }
      }

       async checkViewExistance(view_ref_id) {
            try{
           const view = await this.viewModel
           .findOne({
            mb_id: this.mb_id,
            view_ref_id: view_ref_id,
           })
           .exec();
             return view ? true : false;
            }catch (err){
             throw err;
            }
      }
}

module.exports = View;