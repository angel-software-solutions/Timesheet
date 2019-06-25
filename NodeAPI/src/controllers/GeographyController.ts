import { Request, Response } from "express";
import { getConnection, Any } from "typeorm";
import { Geographies } from "../entity/Geographies";
import { TS } from "typescript-linq";
import { Utils } from "../helpers/Utils";

class GeographyController {
  static getGeographyTreeList(
    data,
    parent: Geographies,
    list: TS.Collections.List<Geographies>
  ) {
    let children = list.where(x => x.GeographyGuid == parent.Guid).toArray();
    children.forEach((element, index) => {
      element.text = element.Name;
      element.value = element.Guid;
      let childList = list
        .where(x => x.GeographyGuid == element.Guid)
        .toList()
        .forEach(x => {
          x.text = x.Name;
          x.value = x.Guid;
        });
      if (parent.GeographyGuid == null) data["Root"]["children"] = children;

      // if (childList && childList.length > 0) {
      children[index] = element;
      children[index]["children"] = childList.toArray();
      // }
      this.getGeographyTreeList(data, element, list);
    });
  }

  static GetAllGeography = async (req: Request, res: Response) => {
    const query = `select *,'true' as 'checked' from Geographies order by Name `;
    const result = await getConnection().query(query);

    let geographies = new TS.Collections.List<Geographies>(false, result);
    let rootElement = geographies
      .where(x => x.GeographyGuid == null || x.GeographyGuid == "")
      .first();

    let treeData: any = { Root: "" };

    rootElement.text = rootElement.Name;
    rootElement.value = rootElement.Guid;
    treeData["Root"] = rootElement;

    // let groupedGeographies = geographies
    //   .where(x => x.GeographyGuid != null || x.GeographyGuid != "")
    //   .groupBy(x => x.GeographyGuid)
    //   .select(function(item) {
    //     if (!item && !item.key) return null;
    //     let parent = geographies.where(x => x.Guid == item.key).first();
    //     //console.log("PARENT", parent);
    //     return {
    //       Guid: parent.Guid,
    //       Name: parent.Name,
    //       Children: item.select(o => o).toArray()
    //     };
    //   })
    //   .toArray();

    //treeData["Root"]["Children"] = groupedGeographies;

    //treeData["Root"] = rootElement;

    GeographyController.getGeographyTreeList(
      treeData,
      rootElement,
      geographies
    );
    let data = Utils.ConvertCircularStructureToJson(treeData);
    res.json(JSON.parse(data));
  };
}
export default GeographyController;
