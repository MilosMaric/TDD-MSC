package favila.utils;

public class GenericResponse<T> {

	private T payload;
	private boolean operationSuccedded;
	private String errorMessage;
	
	public GenericResponse() {
		payload = null;
		errorMessage = "";
	}

	public GenericResponse<T> error() {
		payload = null;
		operationSuccedded = false;
		errorMessage = "";
		return this;
	}
	
	public GenericResponse<T> error(String msg) {
		payload = null;
		operationSuccedded = false;
		errorMessage = msg;
		return this;
	}
	
	public GenericResponse<T> success(T payload) {
		this.payload = payload;
		operationSuccedded = true;
		errorMessage = "";
		return this;
	}
	
	public T getPayload() {
		return payload;
	}

	public void setPayload(T payload) {
		this.payload = payload;
	}

	public boolean isOperationSuccedded() {
		return operationSuccedded;
	}

	public void setOperationSuccedded(boolean operationSuccedded) {
		this.operationSuccedded = operationSuccedded;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
}
