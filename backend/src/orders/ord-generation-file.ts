import { Cabinet } from './cabinet.entity';
import { Order } from './order.entity';

const linkSection = `[Link]
PocketPCPath=""
PCPath="G:\\.shortcut-targets-by-id\\0B3FEOP395MGKUTctOF9WSkhieUE\\Loubier Design\\ACTIVE\\OSMAN, ALEX\\ORDER LIST\\TEST.cvj"
PCDate="1698842112-31123503"
CreateBy="PC_CV"

`;

const getHeaderSection = (customerName: string = '') => {
  return `[Header]
    Version=4
    Unit=0
    Name="Job"
    Description="Default"
    PurchaseOrder=""
    Comment=""
    Customer="${customerName}"
    Contact=""
    Address1=""
    Address2=""
    City=""
    State=""
    Zip=""
    Phone=""
    Fax=""
    Mobile=""
    EMail=""
    ShipToComment=""
    ShipToCustomer=""
    ShipToContact=""
    ShipToAddress1=""
    ShipToAddress2=""
    ShipToCity=""
    ShipToState=""
    ShipToZip=""
    ShipToPhone=""
    ShipToFax=""
    ShipToMobile=""
    ShipToEMail=""
    BaseDoors="Slab - BANDED","Oak","","","","","Door",""
    WallDoors="Slab - BANDED","Oak","","","","","Door",""
    DrawerFront="Slab - BANDED","Oak","","","","","Door",""
    BaseEndPanels="Slab - BANDED","Oak","","","","","Door",""
    WallEndPanels="Slab - BANDED","Oak","","","","","Door",""
    TallEndPanels="Slab - BANDED","Oak","","","","","Door",""
    CabinetConstruction="New Frameless"
    DrawerBoxConstruction="VCS-Legrabox Drawer"
    RollOutConstruction="VCS-Legrabox Roll Out"
    BaseCabinetMaterials="Maple/Maple"
    WallCabinetMaterials="Maple/Maple"
    BaseExposedCabinetMaterials="Maple/Maple"
    WallExposedCabinetMaterials="Maple/Maple"
    DrawerBoxMaterials="VCS-Legrabox Drawer"
    RollOutMaterials="VCS-Legrabox Roll Out"
    PullMaterials="No Pulls/Knobs"
    HingeMaterials="110 Degree Euro"
    GuideMaterials="VCS-Legrabox 750 Orion Gray"
    ClosetBaseDoors=
    ClosetWallDoors=
    ClosetDrawerFront=
    ClosetBaseEndPanels=
    ClosetWallEndPanels=
    ClosetTallEndPanels=
    ClosetCabinetConstruction=""
    ClosetDrawerBoxConstruction=""
    ClosetRollOutConstruction=""
    ClosetMaterials=""
    ClosetDrawerBoxMaterials=""
    ClosetRollOutMaterials=""
    ClosetPullMaterials=""
    ClosetGuideMaterials=""
    ClosetWireBasketMaterials=""
    ClosetRodMaterials=""
    ClosetHingeMaterials=""
    InteriorFinish="System Bone"
    ExteriorFinish="System Bone"
    
    `;
};

const wallsSection = `[Walls]
-60.00000,-50.00000,0.00000,260.00000,96.00000,4.50000,1,2,"0",,,,"7047","S"

`;

const catalogSection = `[Catalog]
Name="Custom Cabinets"

`;

const generateCabinetSection = (cabinet: Cabinet) => {
  const configurationMapping = {
    'DOOR': 'B 1 DOOR',
    '2_DRAWER': 'B 2 DRWR',
    '3_DRAWER': 'B 3 DRWR',
  };
  

  const cabinetIdentifier = configurationMapping[cabinet.configurationType.toUpperCase()];

  return `${cabinet.id},"${cabinetIdentifier}",${cabinet.width.toFixed(5)},${cabinet.height.toFixed(5)},${cabinet.depth.toFixed(5)},"L","B",1,"","7047-F",18.75000,4.00000,0.00000,2,0,"2H-W-W","8423","S"`;
};

export const generateOrdFile = (order: Order): string => {
  const cabinetsSection = order.cabinets
    .map(generateCabinetSection)

    .join('\n');

  const endSection = `[End]
`;

  const fileContent = `${linkSection}${getHeaderSection(order.customerName)}${wallsSection}${catalogSection}[Cabinets]\n${cabinetsSection}\n${endSection}`;
  console.log(`File content generated...`);
  console.log(fileContent);

  return fileContent;
};
