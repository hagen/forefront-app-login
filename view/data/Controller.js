jQuery.sap.declare("view.data.Controller");
// Require the short Id gen library
jQuery.sap.require("thirdparty.shortid.ShortId");

// Provides controller util.Controller
sap.ui.define(["jquery.sap.global", "com/ffa/dash/util/Controller"],
  function(jQuery, UtilController) {
    "use strict";

    var Controller = UtilController.extend("view.data.Controller", /** @lends view.data.Controller */ {

    });

    /***
     *    ██████╗  █████╗ ████████╗ █████╗ ███████╗███████╗████████╗███████╗
     *    ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔════╝██╔════╝╚══██╔══╝██╔════╝
     *    ██║  ██║███████║   ██║   ███████║███████╗█████╗     ██║   ███████╗
     *    ██║  ██║██╔══██║   ██║   ██╔══██║╚════██║██╔══╝     ██║   ╚════██║
     *    ██████╔╝██║  ██║   ██║   ██║  ██║███████║███████╗   ██║   ███████║
     *    ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   ╚══════╝
     *
     */

     /**
      * Checks if the user has any active datasets and returns true/false
      * @return {Boolean} Has data sets
      */
    Controller.prototype.hasDatasets = function () {
      return this.getDatasetCount() > 0;
    };

    /**
     * Gets the number of active data sets belonging to this user
     * @return {Integer} Data set count
     */
    Controller.prototype.getDatasetCount = function () {

      // Declare count
      let iCount = 0;

      // Otherwise read in the forecast.
      this.getView().getModel("dataset").read("/DataSets", {
        filters : [
          new sap.ui.model.Filter({
            path : 'created_by',
            operator : sap.ui.model.FilterOperator.EQ,
            value1 : 'TESTUSER'
          }),
          new sap.ui.model.Filter({
            path : 'endda',
            operator : sap.ui.model.FilterOperator.EQ,
            value1 : '9999-12-31'
          }),
        ],
        success: function(oData, mResponse) {
          iCount = oData.results.length;
        },
        error : jQuery.proxy(function(mError) {
          this._maybeHandleAuthError(mError);
        }, this),
        async: false
      });

      return iCount;
    };

    /**
     * Collect the control
     * @param  {[type]} sId [description]
     * @return {[type]}     [description]
     */
    Controller.prototype._control = function(sId) {
      return this.getView().byId(sId);
    };

    /**
     * Collect the control's value.
     * @param  {[type]} sId [description]
     * @return {[type]}     [description]
     */
    Controller.prototype._value = function (sId) {
      let oControl = this._control(sId);
      if (oControl instanceof sap.m.CheckBox) {
        return (oControl.getSelected() ? 'X' : ' ');
      } else if (oControl instanceof sap.m.Select){
        return oControl.getSelectedKey();
      } else {
        return oControl.getValue();
      }
    };
  });
