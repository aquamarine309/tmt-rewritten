import { DC } from '@framework/utils/constants';
import { NotImplementedError } from "@framework/utils/not-implemented-error";
import { funOrVal } from "@framework/utils/extensions";

export class RequirementState {
  constructor(config) {
    this.config = config;
  }

  requirementAt(current) {
    throw new NotImplementedError();
  }

  bulkAt(amount) {
    throw new NotImplementedError();
  }
  
  get gainMult() {
    return funOrVal(this.config.gainMult) || DC.D1;
  }
  
  get gainPow() {
    return funOrVal(this.config.gainPow) || DC.D1;
  }
  
  mulBulk(value) {
    return value.times(this.gainMult).pow(this.gainPow);
  }
  
  mulReq(value) {
    return value.root(this.gainPow).div(this.gainMult);
  }
}

export class ExponentialRequirement extends RequirementState {
  get baseReq() {
    return funOrVal(this.config.baseReq);
  }
  
  get base() {
    return funOrVal(this.config.base);
  }
  
  get exponent() {
    return funOrVal(this.config.exponent);
  }

  requirementAt(current) {
    return this.baseReq.times(this.base.pow(this.mulReq(current).pow(this.exponent)));
  }

  bulkAt(amount) {
    if (amount.lt(this.baseReq)) return DC.D0;
    return this.mulBulk(amount.div(this.baseReq).log(this.base).root(this.exponent)).floor().add(1);
  }
}

export class PowerRequirement extends RequirementState {
  get baseReq() {
    return funOrVal(this.config.baseReq);
  }
  
  get power() {
    return funOrVal(this.config.power);
  }

  requirementAt(current) {
    return this.baseReq.times(this.mulReq(current).add(1).pow(this.power));
  }

  bulkAt(amount) {
    if (amount.lt(this.baseReq)) return DC.D0;
    return this.mulBulk(amount.div(this.baseReq).root(this.power)).floor();
  }
}