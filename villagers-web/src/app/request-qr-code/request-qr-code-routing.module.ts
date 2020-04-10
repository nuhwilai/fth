import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RequestQrCodeComponent } from "./request-qr-code.component";

const routes: Routes = [
  { path: "request-qr-code", component: RequestQrCodeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestQrCodeRoutingModule {}
