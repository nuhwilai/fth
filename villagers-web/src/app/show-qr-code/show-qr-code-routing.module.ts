import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShowQrCodeComponent } from "./show-qr-code.component";

const routes: Routes = [
  { path: "show-qr-code", component: ShowQrCodeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowQrCodeRoutingModule {}
